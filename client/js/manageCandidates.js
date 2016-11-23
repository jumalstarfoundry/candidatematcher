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

var canBePlaced = function(candidate, site) {

    var businessRulesMet = {};

    // Reject candidate if cannot work 2 days or more
    const minimumNumberOfDays = 2;
    businessRulesMet.willingToWorkEnough = candidate["Number of Days to Work"] >= minimumNumberOfDays;

console.log("testing whether candidate can work enough...");
    if (!businessRulesMet.willingToWorkEnough) return false;

console.log("work enough test passed...");

    // We've determined that the candidate is willing to work enough, but we still need to see
    // if the candidate is actually available during which site operation hours:

    // For each day, compare candidate start and end times to site start and end times
    var daysAvailableAtSite = 0;
    var siteStartTime, siteEndTime;

    // special cases to deal with
    var candidateFreeFriday = false;
    var candidateFreeEarlyWedPlusOneDay = false;


    var findCandidateStartTime = function(day){
      return candidate[day.charAt(0).toUpperCase() + day.substr(1) + " Start Time"];
    }

    var findCandidateEndTime = function(day){
      return candidate[day.charAt(0).toUpperCase() + day.substr(1) + " End Time"];
    }

    var findSiteStartTime = function(day){
      return site[day.charAt(0).toLowerCase() + day.substr(1) + "Start"];
    }

    var findSiteEndTime = function(day){
      return site[day.charAt(0).toLowerCase() + day.substr(1) + "End"];
    }

    var candidateMatchesWithSite = function(day)
      {
        var candidateStartTime, candidateEndTime;

        candidateStartTime = findCandidateStartTime(day);
        candidateEndTime = findCandidateEndTime(day);
        siteStartTime = findSiteStartTime(day);
        siteEndTime = findSiteEndTime(day);

        ///const minimumMillsecondsToWork = 3600000; // 1 hour // removed minimum work time feature, since candidate must be able to work for the entirety of the shift

        var candidateCanShowUpBeforeClosing = moment(siteEndTime, "HH:mm").diff(moment(candidateStartTime, "HH:mm")) >= 0;
        var candidateCanLeaveAfterOpening =  moment(candidateEndTime, "HH:mm").diff(moment(siteStartTime, "HH:mm")) >= 0;
        ///var timeAvailableForWork = moment(candidateEndTime, "HH:mm").diff(moment(candidateStartTime, "HH:mm"));

        console.log(candidate["First Name"] + " " + candidate["Last Name"] + " can show up before closing: ", candidateCanShowUpBeforeClosing);
        console.log(candidate["First Name"] + " " + candidate["Last Name"] + " can leave after opening: ", candidateCanLeaveAfterOpening);
        
        return candidateCanShowUpBeforeClosing && candidateCanLeaveAfterOpening; // && (timeAvailableForWork >= minimumMillsecondsToWork);

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

        candidateFreeEarlyWedPlusOneDay = moment("14:00", "HH:mm").diff(moment(findCandidateStartTime("Wednesday"), "HH:mm")) <= 0;
      }  

      if(candidateMatchesWithSite("Thursday"))
      {
        daysAvailableAtSite++;
      }  

      if(candidateMatchesWithSite("Friday"))
      {
        daysAvailableAtSite++;
        candidateFreeFriday = true;
      }  

      console.log("available number of days is ", daysAvailableAtSite);


businessRulesMet.schedulesMatch = daysAvailableAtSite >= minimumNumberOfDays; 
businessRulesMet.travelWillingness = site.requiresTravel == candidate['Willing to Travel?'];


return businessRulesMet.travelWillingness && businessRulesMet.schedulesMatch;
   

};


 

Template.manageCandidates.events({
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
   var unassignedCandidates = Candidates.find({prioritySite:{ $exists: false}}); // toggle switch
   var availableSites = Sites.find();
   var potentialAssignments = {};
   var candidatePriorityTracker = [];


    sAlert.success('Auto-match starting... !', undefined); // https://atmospherejs.com/juliancwirko/s-alert


    unassignedCandidates.forEach(function (candidate) {
        var candidatePlacementCount = 0;

        availableSites.forEach(function (site){
                                                  if (canBePlaced(candidate, site)){

//                                                      var candId = candidate._id;
                                                      
                                                      // Take note of the fact that this candidate can be assigned to this site
                                                      
                                                      // If the site has already received assignments, there is no need to 
                                                      // initialize an object at the site key value
                                                      //

                                                      if(potentialAssignments[site.name])
                                                        {
                                                          potentialAssignments[site.name][candidate._id] = candidate;
                                                        }
                                                      else
                                                      {
                                                        var candidateLookup = {};
                                                        candidateLookup[candidate._id] = candidate;
                                                        potentialAssignments[site.name] = candidateLookup;
                                                        //_.extend(potentialAssignments[site.name], {candId:candidate});//_.extend(potentialAssignments[site.name],  {candidate["_id"]:candidate}  );
                                                      }

                                                      // Create a separate array with objects, to have a list we can sort (later) and use to know which candidate to place first
                                                      // It should look something like:
                                                      // [ {candIDwerwer: 3 (days available)}, {candIDklasjlk: 3 }, {candIDasjejk3: 2}, ... ]
                                                      // Using this array helps us avoid having to deal with merging the duplicates from the placementMatrix
                                                      //
                                                      // Only add an entry in this array if the candidate hasn't been added yet
                                                      console.log("Testing if candidatePriorityTracker has the candidate id...", candidatePriorityTracker, "findIndex", _.findIndex(candidatePriorityTracker, {id: candidate._id}));

                                                      if ( _.findIndex(candidatePriorityTracker, {id: candidate._id}) == -1 )
                                                      {
                                                        console.log("nope, no id is currently being tracked.....");
                                                      
                                                        candidatePriorityTracker.push({id: candidate._id, daysWillingToWork: candidate["Number of Days to Work"], workStatus: candidate["Preferred Volunteer Status"]});
                                                      }


                                                      candidatePlacementCount++;
                                                  }
                                                }
        );

        // DEBUG
        //
        console.log("number of sites candidate can be placed is " + candidatePlacementCount);
        console.log("However, candidate has requested to only work", candidate["Number of Days to Work"]);


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

    console.log("The placement matrix we've found is: " , potentialAssignments);

    console.log("The ranking of days to work is " , candidatePriorityTracker);
    // CALCULATE AND STORE SITE RATIOS FOR POTENTIAL PLACEMENTS FOR FINAL PLACEMENT

    // Calculate the number of openings at each site


    // Go through the potentialAssignments and start applying rules
    // 

// Run site vs. candidate rules
var candidateSiteFit = function(candidate, site){
  var businessPreferencesMet = {};

  //
  businessPreferencesMet.freeFridayPlusOneDay = site.prefersFreeFridayPlusOneDay ? candidateFreeFriday : true;
  businessPreferencesMet.freeOnEarlyWedPlusOneDay = site.prefersFreeEarlyWedPlusOneDay ? candidateFreeEarlyWedPlusOneDay : true;
  businessPreferencesMet.speaksSpanish = site.prefersSpanish



}

// NEXT: MODIFY SITE SCHEMA TO REFLECT SITE BIZ RULES
  


    sAlert.success('Auto-match complete!', undefined); // https://atmospherejs.com/juliancwirko/s-alert


  }
});

Template.editCandidate.helpers({
  currentCandidate: function() {

    var currCandidate = Candidates.findOne(FlowRouter.getParam('candidateId'));
    console.log("The current candidate is", currCandidate);

    return currCandidate;
  }
});
