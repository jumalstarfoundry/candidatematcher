import { Template } from 'meteor/templating';
import './../views/manageSites.html';
import _ from 'underscore';

/*
getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

findSite = function(doc){
  var sitesArray = Sites.find().fetch();
  var randomIndex = getRandomInt(0, sitesArray.length-1);

  console.log("Random site is ", sitesArray[randomIndex]);
  return sitesArray[randomIndex]._id;
}

findShift = function(doc){
  var shiftsArray = Shifts.find().fetch();
  var randomIndex = getRandomInt(0, shiftsArray.length-1);

  console.log("Random shift is ", shiftsArray[randomIndex]);

  return shiftsArray[randomIndex]._id;

}
*/
var findCandidateStartTime = function(cand, day){
  return cand[day.charAt(0).toUpperCase() + day.substr(1) + " Start Time"];
}

var findCandidateEndTime = function(cand, day){
  return cand[day.charAt(0).toUpperCase() + day.substr(1) + " End Time"];
}

var placeCandidate = function(candidate, site) {

    var businessRulesMet = {};

    // Reject candidate if cannot work 2 days or more
    const minimumNumberOfDays = 2;
    businessRulesMet.willingToWorkEnough = candidate["Number of Days to Work"] >= minimumNumberOfDays;

    /////console.log("testing whether candidate can work enough...");
    if (!businessRulesMet.willingToWorkEnough) {
      /////console.log("not willing to work enough...");
      Candidates.update({_id: candidate._id}, {$set: {prioritySite: "unassigned", notes:"Not willing to work 2+ days."}});

      return false;
    }
    console.log("testing whether candidate can work enough...");

///console.log("work enough test passed...");

    // We've determined that the candidate is willing to work enough, but we still need to see
    // if the candidate is actually available during which site operation hours:

    // For each day, compare candidate start and end times to site start and end times
    var daysAvailableAtSite = 0;
    var siteStartTime, siteEndTime;

    // special cases to deal with
    //var candidateFreeFriday = false;
    //var candidateFreeEarlyWedPlusOneDay = false;




    // Sites use 3 digit day format, except for 'Thur'
    var findSiteStartTime = function(day){
      var daySubstring = (day+"").substr(1,3);

      if((day+"") != "Thursday"){
        daySubstring = daySubstring.substr(0,2); // Shave off the last char if day isn't Thursday
      }

// DEBUG
/////console.log((day+"") + " has been converted to ", (day+"").charAt(0).toUpperCase() +  daySubstring + " Start Time");

      return site[(day+"").charAt(0).toUpperCase() +  daySubstring + " Start Time"];
    }

    var findSiteEndTime = function(day){

      var daySubstring = (day+"").substr(1,3);

      if((day+"") != "Thursday"){
        daySubstring = daySubstring.substr(0,2); // Shave off the last char if day isn't Thursday
      }

      return site[(day+"").charAt(0).toUpperCase() + daySubstring + " End Time"];
    }

    var candidateMatchesWithSite = function(day)
      {
        var candidateStartTime, candidateEndTime;

        candidateStartTime = findCandidateStartTime(candidate, day);
        candidateEndTime = findCandidateEndTime(candidate, day);
        siteStartTime = findSiteStartTime(day);
        siteEndTime = findSiteEndTime(day);

        ///const minimumMillsecondsToWork = 3600000; // 1 hour // removed minimum work time feature, since candidate must be able to work for the entirety of the shift

        var candidateCanShowUpBeforeOrAtStart = moment(siteStartTime, "HH:mm").diff(moment(candidateStartTime, "HH:mm")) >= 0;
        var candidateCanLeaveAtOrAfterClosing =  moment(candidateEndTime, "HH:mm").diff(moment(siteEndTime, "HH:mm")) >= 0;
        ///var timeAvailableForWork = moment(candidateEndTime, "HH:mm").diff(moment(candidateStartTime, "HH:mm"));

///DEBUG
/*
        if(candidate["First Name"] == "My" && site["Site"] == "Bahia")
        {

          console.log("candidateStartTime is ", candidateStartTime);
          console.log("candidateEndTime is ", candidateEndTime);
          console.log("siteStartTime is ", siteStartTime);
          console.log("siteEndTime is ", siteEndTime);

          console.log("Difference ebtween siteStartTime and candStartTime is", moment(siteStartTime, "HH:mm").diff(moment(candidateStartTime, "HH:mm")) );
          console.log("Difference ebtween siteEndTime and candEndTime is",  moment(candidateEndTime, "HH:mm").diff(moment(siteEndTime, "HH:mm")) );

          console.log(candidate["First Name"] + " " + candidate["Last Name"] + " can show up before or at start: ", candidateCanShowUpBeforeOrAtStart);
          console.log(candidate["First Name"] + " " + candidate["Last Name"] + " can leave at or after closing: ", candidateCanLeaveAtOrAfterClosing);

        }
*/
        return candidateCanShowUpBeforeOrAtStart && candidateCanLeaveAtOrAfterClosing; // && (timeAvailableForWork >= minimumMillsecondsToWork);

      }

      if(candidateMatchesWithSite("Monday"))
      {
        daysAvailableAtSite++;

      }

      if(candidateMatchesWithSite("Tuesday"))
      {
        daysAvailableAtSite++;
      }

      if(candidateMatchesWithSite("Wednesday"))
      {
        daysAvailableAtSite++;

      }

      if(candidateMatchesWithSite("Thursday"))
      {
        daysAvailableAtSite++;
      }

      if(candidateMatchesWithSite("Friday"))
      {
        daysAvailableAtSite++;
        //candidate.freeFridayPlusOneDay = daysAvailableAtSite > 1;
      }

      var candidateMatchStats = {};

      candidateMatchStats.daysAvailableAtSite = daysAvailableAtSite;
      candidateMatchStats.free2pmWedPlusOneDay = (moment("14:00", "HH:mm").diff(moment(findCandidateStartTime(candidate, "Wednesday"), "HH:mm")) <= 0) && (daysAvailableAtSite > 1);
      candidateMatchStats.free245pmWedPlusOneDay = (moment("14:45", "HH:mm").diff(moment(findCandidateStartTime(candidate, "Wednesday"), "HH:mm")) <= 0) && (daysAvailableAtSite > 1);

      var available230to5_Mon =  (moment("14:30", "HH:mm").diff(moment(findCandidateStartTime(candidate, "Monday"), "HH:mm")) <= 0)
                              && (moment("17:00", "HH:mm").diff(moment(findCandidateEndTime(candidate, "Monday"), "HH:mm")) >= 0);

      var available230to5_Tue =  (moment("14:30", "HH:mm").diff(moment(findCandidateStartTime(candidate, "Tuesday"), "HH:mm")) <= 0)
                              && (moment("17:00", "HH:mm").diff(moment(findCandidateEndTime(candidate, "Tuesday"), "HH:mm")) >= 0);

      var available230to5_Wed =  (moment("14:30", "HH:mm").diff(moment(findCandidateStartTime(candidate, "Wednesday"), "HH:mm")) <= 0)
                              && (moment("17:00", "HH:mm").diff(moment(findCandidateEndTime(candidate, "Wednesday"), "HH:mm")) >= 0);

      var available230to5_Thur =  (moment("14:30", "HH:mm").diff(moment(findCandidateStartTime(candidate, "Thurday"), "HH:mm")) <= 0)
                        && (moment("17:00", "HH:mm").diff(moment(findCandidateEndTime(candidate, "Thursday"), "HH:mm")) >= 0);


      candidateMatchStats.availableTwoPlusDaysAndAnyDayMTWTh230to5 = available230to5_Mon && available230to5_Tue && available230to5_Wed && available230to5_Thur && (candidate['Number of Days to Work']>1);

/// DEBUG
/*if(candidate["First Name"] == "My" && site["Site"] == "Bahia")
{
console.log("available number of days is ", daysAvailableAtSite);
}
*/
candidateMatchStats.meetsMinimumAvailabilityAtSite = daysAvailableAtSite >= minimumNumberOfDays;
//businessRulesMet.travelWillingness = site.requiresTravel == candidate['Willing to Travel?'];


return  candidateMatchStats;


};




Template.manageCandidates.events({
  "click #exportMatches": function(event) {
    var nameFile = 'exportedCandidates.csv';
    Meteor.call('downloadCandidates', function(err, fileContent) {
      if(fileContent){
        var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
        saveAs(blob, nameFile);
      }
    });
  },
  "click #autoMatch": function() {

    // Loop through candidates
 /*
    var unassignedCandidates = Candidates.find({prioritySite:{ $exists: false}}); // toggle switch

    sAlert.success('Auto-match starting... !', undefined); // https://atmospherejs.com/juliancwirko/s-alert

    unassignedCandidates.forEach(function (candidate) {
      Candidates.update(candidate._id, {$set: { prioritySite: findSite(candidate), priorityShift: findShift(candidate) }});
    });

    sAlert.success('Auto-match complete!', undefined); // https://atmospherejs.com/juliancwirko/s-alert

*/


// STEP 1: REJECT ALL FOLKS WHO CAN ONLY WORK FEWER THAN 2 DAYS
// STEP 2: RUN ALGORITHM ON WORK STUDY OR UNITS
// STEP 3: RUN ALGORITHM ON VOLUNTEERS FOR REMAINING SITES



// STEP 2:
   //var unassignedCandidates = Candidates.find({prioritySite:{ $exists: false}}); // toggle switch

   var unassignedCandidates = Candidates.find({$or:[{prioritySite:"pending", "Preferred Volunteer Status":"Work-study"},{prioritySite:"pending", "Preferred Volunteer Status":"Education 97/197 course credit"}]});
   var availableSites = Sites.find();
   var potentialAssignments= {};
   var candidatePriorityTracker = [];


   sAlert.success('Auto-match starting... !', undefined); // https://atmospherejs.com/juliancwirko/s-alert


   unassignedCandidates.forEach(function (candidate) {
        var candidatePlacementCount = 0;

        availableSites.forEach(function (site){
                                                  if (placeCandidate(candidate, site).meetsMinimumAvailabilityAtSite){

//                                                      var candId = candidate._id;

                                                      // Take note of the fact that this candidate can be assigned to this site

                                                      // If the site has already received assignments, there is no need to
                                                      // initialize an object at the site key value
                                                      //


                                                      if(potentialAssignments[site.Site])
                                                        {
                                                          potentialAssignments[site.Site][candidate._id] = candidate;
                                                          potentialAssignments[site.Site]["placementCount"] = potentialAssignments[site.Site]["placementCount"] + 1;

                                                        }
                                                      else
                                                      {
                                                          let candidateLookup = {};
                                                          candidateLookup[candidate._id] = candidate;
                                                          potentialAssignments[site.Site] = candidateLookup;
                                                          potentialAssignments[site.Site]["placementCount"] = 1;

                                                        //_.extend(potentialAssignments[site.name], {candId:candidate});//_.extend(potentialAssignments[site.name],  {candidate["_id"]:candidate}  );
                                                      }

                                                      // Create a separate array with objects, to have a list we can sort (later) and use to know which candidate to place first
                                                      // It should look something like:
                                                      // [ {candIDwerwer: 3 (days available)}, {candIDklasjlk: 3 }, {candIDasjejk3: 2}, ... ]
                                                      // Using this array helps us avoid having to deal with merging the duplicates from the placementMatrix
                                                      //
                                                      // Only add an entry in this array if the candidate hasn't been added yet
                                          /////          console.log("Testing if candidatePriorityTracker has the candidate id...", candidatePriorityTracker, "findIndex", _.findIndex(candidatePriorityTracker, {id: candidate._id}));

                                                      /////console.log("find index is...." ,  _.findIndex(candidatePriorityTracker, {id: candidate._id}));

                                                      if ( _.findIndex(candidatePriorityTracker, {_id: candidate._id}) == -1 )
                                                      {
                                          ///              console.log("nope, no id is currently being tracked.....");

                                                        candidatePriorityTracker.push(candidate);
                                                      }


                                                      candidatePlacementCount++;
                                                  }
                                                }
        );

        // DEBUG
        //
///        console.log("number of sites candidate can be placed is " + candidatePlacementCount);
///        console.log("However, candidate has requested to only work", candidate["Number of Days to Work"]);


        /*
        ///// Remove matchPriority, no longer needed
        // If this candidate can be placed somewhere, then we can assign them a match priority.
        //
        if(candidatePlacementCount >= 1){


          Candidates.update(candidate._id, {$set: { matchPriority: 1/candidatePlacementCount*1000+1000 }});
          }

        // Otherwise, there are no sites we can find for them, so we mark them as unmactched
        //
        else
        {
          Candidates.update(candidate._id, {$set: { matchPriority: 999999999 }});
        }

        */
    });

    // Now we should have a placement matrix

/////    console.log("The placement matrix we've found is: " , potentialAssignments);
    Session.set('potentialAssignmentsSessionVar', potentialAssignments);

  /////  console.log("A sample value (Bahia) from the placement matrix we've found is: " , potentialAssignments["Bahia"]);
/////    console.log("The ranking of days to work is " , candidatePriorityTracker);

    // additionalDaysFreeArray ["Monday", "Tuesday"] means candidate should also be free
    // on Monday OR Tuesday in addition to what's specified in the other parameters
    //
    var freeOnDayTime = function(cand, day, startTime, endTime){

      var freeStatus = false;
      var candStartTime, candEndTime;

      // special cases to deal with
      //var candidateFreeFriday = false;
      //var candidateFreeEarlyWedPlusOneDay = false;

      candStartTime = findCandidateStartTime(cand, day);
      candEndTime = findCandidateEndTime(cand, day);
/*
      console.log("cand start time is ", candStartTime);
      console.log("cand end time is ", candEndTime);
*/

      if(candStartTime){
        freeStatus = true;
/////        console.log("cand is considered free on ", day);

      }

      if (startTime){

          var canShowUpBeforeOrAtStart = moment(startTime, "HH:mm").diff(moment(candStartTime, "HH:mm")) >= 0;
          freeStatus = freeStatus && canShowUpBeforeOrAtStart;
/*
          console.log("cand needs to show up by", startTime);
          console.log("cand is able to show up by", candStartTime);

          console.log("cand can show up before or at start ", canShowUpBeforeOrAtStart);
*/
          if(endTime){
            var canLeaveAtOrAfter =  moment(candEndTime, "HH:mm").diff(moment(endTime, "HH:mm")) >= 0;
            freeStatus = freeStatus && canLeaveAtOrAfter;
          }
      }

      return freeStatus;
    }

    var meetsGroupCriteria = function(candidateToCheck, groupToCheck){
      var meetsCriteria = false;
      switch (groupToCheck)
      {
        case 1: // Willing to travel, Free on Friday + 1 other day
      //////  console.log("Cand being checked is", candidateToCheck);
      //////  console.log("willing to travel value is", candidateToCheck['Willing to Travel?']);
        meetsCriteria = (candidateToCheck['Willing to Travel?'] == 'Yes')
                        && freeOnDayTime(candidateToCheck, "Friday", "", "")
                        && (
                            freeOnDayTime(candidateToCheck, "Monday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Tuesday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Wednesday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Thursday", "", "")
                            );
        break;
        case 2: // Willing to travel, not free Friday + 1 other day, and free on Wed before 2p + can work another day
        meetsCriteria = (candidateToCheck['Willing to Travel?'] == 'Yes')
                        &&
                        !(
                          freeOnDayTime(candidateToCheck, "Friday", "", "")
                          &&
                          (
                            freeOnDayTime(candidateToCheck, "Monday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Tuesday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Wednesday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Thursday", "", "")
                          )
                        )
                          &&
                        (
                          freeOnDayTime(candidateToCheck, "Wednesday", "14:00", "") &&
                          (
                            freeOnDayTime(candidateToCheck, "Monday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Tuesday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Thursday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Friday", "", "")
                          )
                        );

        break;
        case 3: // Willing to travel, not free Friday + 1 other day, and free on Wed before 2p + can work another day
        meetsCriteria = (candidateToCheck['Willing to Travel?'] == 'Yes')
                        &&
                        !(
                          freeOnDayTime(candidateToCheck, "Friday", "", "")
                          &&
                          (
                            freeOnDayTime(candidateToCheck, "Monday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Tuesday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Wednesday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Thursday", "", "")
                          )
                        )
                          &&
                        !(
                          freeOnDayTime(candidateToCheck, "Wednesday", "14:00", "") &&
                          (
                            freeOnDayTime(candidateToCheck, "Monday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Tuesday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Thursday", "", "") ||
                            freeOnDayTime(candidateToCheck, "Friday", "", "")
                          )
                        );

        break;
        case 4: // Not willing to travel, speaks spanish, available to work 2+ days, and Free MTW or Th 2:30-5p
        meetsCriteria = (!candidateToCheck['Willing to Travel?'] == 'Yes')
                          && (candidateToCheck["Languages spoken"].toLowerCase().includes("spanish") )
                          && (candidateToCheck["Number of Days to Work"] >= 2)
                          && (
                            freeOnDayTime(candidateToCheck, "Monday", "14:30", "17:00") ||
                            freeOnDayTime(candidateToCheck, "Tuesday", "14:30", "17:00") ||
                            freeOnDayTime(candidateToCheck, "Wednesday", "14:30", "17:00") ||
                            freeOnDayTime(candidateToCheck, "Thursday", "14:30", "17:00")
                          );
        break;
        case 5: // Not willing to travel, speaks spanish, NOT available to work 2+ days + Free MTW or Th 2:30-5p
        meetsCriteria = (!candidateToCheck['Willing to Travel?'] == 'Yes')
                          && (candidateToCheck["Languages spoken"].toLowerCase().includes("spanish") )
                          && !(
                                (candidateToCheck["Number of Days to Work"] >= 2)
                                && (
                                    freeOnDayTime(candidateToCheck, "Monday", "14:30", "17:00") ||
                                    freeOnDayTime(candidateToCheck, "Tuesday", "14:30", "17:00") ||
                                    freeOnDayTime(candidateToCheck, "Wednesday", "14:30", "17:00") ||
                                    freeOnDayTime(candidateToCheck, "Thursday", "14:30", "17:00")
                                  )
                              )
                          && candidateToCheck["Position_Site_Preference1"] == "Bahia";
        break;
        case 6: // Not willing to travel, does NOT speak spanish, available Friday + 1 more day
        meetsCriteria = (!candidateToCheck['Willing to Travel?'] == 'Yes')
                          && !(candidateToCheck["Languages spoken"].toLowerCase().includes("spanish") )
                          && (
                                (candidateToCheck["Number of Days to Work"] >= 2)
                                && freeOnDayTime(candidateToCheck, "Friday", "", "")
                              );
        break;
        case 6: // Not willing to travel, does NOT speak spanish, available Friday + 1 more day
        meetsCriteria = (!candidateToCheck['Willing to Travel?'] == 'Yes')
                          && !(candidateToCheck["Languages spoken"].toLowerCase().includes("spanish") )
                          && !(
                                (candidateToCheck["Number of Days to Work"] >= 2)
                                && freeOnDayTime(candidateToCheck, "Friday", "", "")
                              )
                          && freeOnDayTime(candidateToCheck, "Friday", "14:45", "");
        break;
        case 8:
                meetsCriteria = true;
        break;

        default:
        break;
      }

      return meetsCriteria;
    };

    // Assumes candidate meets
    var attemptAssignment = function(candidateToTry, sitesToTryArray){

      // Check to see if candidate has availability via potentialAssignments
      /// NEXT: Check according to filled ratio

      var assignmentSucceeded = false;

      sitesToTryArray.forEach(function(siteNameToTry){

        /////console.log("About to try site....", siteNameToTry);
        //console.log("The candidate object in the assignements array is... ", potentialAssignments[siteNameToTry][candidateToTry._id]);
        //console.log("The true value of it is", potentialAssignments[siteNameToTry][candidateToTry._id] == false);

        // check for sites that had no potential assignments at all
        //
        if(!potentialAssignments[siteNameToTry])
        {
          potentialAssignments[siteNameToTry] = {};
        }

        if(potentialAssignments[siteNameToTry][candidateToTry._id])
        {
          // Candidate's schedule matches with this site in this group!

          /////          console.log("Now assigning to site", siteNameToTry);

          var siteIdToTry = Sites.findOne({Site:siteNameToTry})._id;

          // Assign to next in line UNLESS the ratio is off!
          // FUTURE
          Candidates.update({_id: candidateToTry._id}, {$set: {prioritySite: siteIdToTry}});
          assignmentSucceeded = true;

          // update placement matrix by removing from all other sites


          // Remove candidate from other sites
          var currentNotes = Candidates.findOne(candidateToTry._id).notes
          currentNotes = currentNotes ? currentNotes + " Could also work at " : "Could also work at ";

          for (var siteName in potentialAssignments) {
            /////console.log("site id is ", siteName);
            /////console.log("The site itself is", potentialAssignments[siteName]);

            if (potentialAssignments[siteName][candidateToTry._id]){

              // If the site we're at isn't the one we've now assigned the candidate to
              if(siteNameToTry != siteName){

                // PULL UP ACTUAL NOTES FROM DB

                currentNotes =  currentNotes + siteName + "; ";
                Candidates.update({_id: candidateToTry._id}, {$set: {notes: currentNotes}});

                delete potentialAssignments[siteName][candidateToTry._id];
                potentialAssignments[siteName]["candidatePlacementCount"] = potentialAssignments[siteName]["candidatePlacementCount"] - 1;
              }


              // Remove candidate from the priority tracker...?
              // May not be needed, since this function is already called during an interation through that array
            }


          };

          /////console.log("The new placement matrix (now that the candidate has been removed from everywhere else) is", potentialAssignments);
        }

      });

      return assignmentSucceeded;
    };

    var getGroupSiteArray = function(groupNumber) {
      switch (groupNumber)
      {
        case 1:
        return ["Berkley Maynard Academy", "Lafayette", "Martin Luther King"];
        case 2:
        return ["TCN/ICS", "Sankofa"];
        case 3:
        return ["TCN/ICS", "Sankofa", "Berkley Maynard Academy", "Martin Luther King", "Lafayette", "Emerson Oakland" ];
        case 4:
        return ["LeConte"];
        case 5:
        return ["Bahia"];
        case 6:
        return ["Emerson Berkeley", "Washington", "Oxford", "Jefferson", "James Kenney", "Berkeley Youth Alternatives", "Bahia"];
        case 7:
        return ["Rosa Parks", "Washington", "Emerson Berkeley", "John Muir", "Oxford", "LeConte", "Jefferson", "Thousand Oaks", "Berkeley Youth Alternatives"];
        case 8:
        return ["Emerson Berkeley", "Rosa Parks", "Washington", "John Muir", "Oxford", "Jefferson", "LeConte", "Thousand Oaks", "Cragmont", "Malcolm X", "Berkeley Arts Magnet", "Berkeley Youth Alternatives", "James Kenney", "Bahia" ];
        default:
        return [];
      }
    }

    console.log("candidate priority tracker is ", candidatePriorityTracker);
    // For each candidate in candidatePriorityTracker
    candidatePriorityTracker.forEach(function (cand) {
        // while candidate hasn't been placed
        var candidatePlaced = false;
        var currentGroup = 1;

        var groupsBelongingTo = "";

        while (!candidatePlaced && (currentGroup <= 8) ) {
          // If candidate belongs to currentGroup

          if(meetsGroupCriteria(cand, currentGroup)){

            groupsBelongingTo = groupsBelongingTo + currentGroup + "; ";
            // attemptAssignment to currentGroup
            candidatePlaced = attemptAssignment(cand, getGroupSiteArray(currentGroup));
          }
          // increase group until group = 8
          currentGroup++;
        }

        var currentNotes = Candidates.findOne(cand._id).notes;
      /////  console.log("Current notes are", currentNotes);

        currentNotes = currentNotes ? currentNotes : "";

        if(!candidatePlaced)
        {

          // Assign to the "Unassigned" Sites
          Candidates.update({_id: cand._id}, {$set: {prioritySite: "unassigned", notes: "Candidate belongs to no groups - unassigned; " + currentNotes }});

        }
        else {
          currentNotes = currentNotes + " Belongs to group(s) " + groupsBelongingTo;
          Candidates.update({_id: cand._id}, {$set: {notes: currentNotes }});
        }

    });


    // CALCULATE AND STORE SITE RATIOS FOR POTENTIAL PLACEMENTS FOR FINAL PLACEMENT

    // Calculate the number of openings at each site


    // Go through the potentialAssignments and start applying rules
    //

// Run site vs. candidate rules

/*
var candidateSiteFit = function(candidate, site){
  var businessPreferencesMet = {};

  //
  businessPreferencesMet.freeFridayPlusOneDay = site.prefersFreeFridayPlusOneDay ? candidateFreeFriday : true;
  businessPreferencesMet.freeOnEarlyWedPlusOneDay = site.prefersFreeEarlyWedPlusOneDay ? candidateFreeEarlyWedPlusOneDay : true;
  businessPreferencesMet.speaksSpanish = site.prefersSpanish



}
*/

// NEXT: MODIFY SITE SCHEMA TO REFLECT SITE BIZ RULES



    sAlert.success('Auto-match complete!', undefined); // https://atmospherejs.com/juliancwirko/s-alert


  }
});

Template.editCandidate.helpers({
  currentCandidate: function() {

    var currCandidate = Candidates.findOne(FlowRouter.getParam('candidateId'));
    //////console.log("The current candidate is", currCandidate);

    return currCandidate;
  }
});
