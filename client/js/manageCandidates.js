import { Template } from 'meteor/templating';
import './../views/manageSites.html';

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

    // For each day, compare candidate start and end times to site start and end times
    var daysAvailableAtSite = 0;
    var candidateStartTime, candidateEndTime;
    var siteStartTime, siteEndTime;

    // special cases to deal with
    var candidateFreeFriday = false;
    var candidateFreeEarlyWedPlusOneDay = false;

    candidateStartTime = candidate[day.charAt(0).toUpperCase() + day.substr(1) + " Start Time"];
    candidateEndTime = candidate[day.charAt(0).toUpperCase() + day.substr(1) + " End Time"];
    siteStartTime = site[day.charAt(0).toLowerCase() + day.substr(1) + "Start"];
    siteEndTime = site[day.charAt(0).toLowerCase() + day.substr(1) + "End"];

    var candidateMatchesWithSite = function(day)
      {
    
        const minimumMillsecondsToWork = 3600000; // 1 hour

        var candidateCanShowUpBeforeClosing = moment(siteEndTime, "HH:mm").diff(moment(candidateStartTime, "HH:mm")) >= 0;
        var candidateCanLeaveAfterOpening =  moment(candidateEndTime, "HH:mm").diff(moment(siteStartTime, "HH:mm")) >= 0;
        var timeAvailableForWork = moment(candidateEndTime, "HH:mm").diff(moment(candidateStartTime, "HH:mm"));

        console.log(candidate["First Name"] + " " + candidate["Last Name"] + " can show up before closing: ", candidateCanShowUpBeforeClosing);
        console.log(candidate["First Name"] + " " + candidate["Last Name"] + " can leave after opening: ", candidateCanLeaveAfterOpening);
        
        return candidateCanShowUpBeforeClosing && candidateCanLeaveAfterOpening && (timeAvailableForWork >= minimumMillsecondsToWork);

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

        candidateFreeEarlyWedPlusOneDay = moment("14:00", "HH:mm").diff(moment(candidateStartTime, "HH:mm")) <= 0;
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


var businessRulesMet = {};

// Run candidate specific rules
const minimumNumberOfDays = 2;
businessRulesMet.daysAvailable = daysAvailableAtSite >= minimumNumberOfDays;

// Run site vs. candidate rules
businessRulesMet.travelWillingness = site.requiresTravel == candidate['Willing to Travel?'];
businessRulesMet.freeFridayPlusOneDay = site.requiresFreeFridayPlusOneDay ? candidateFreeFriday : true;
businessRulesMet.freeOnEarlyWedPlusOneDay = site.requiresFreeEarlyWedPlusOneDay ? candidateFreeEarlyWedPlusOneDay : true;

return businessRulesMet.daysAvailable
    && businessRulesMet.travelWillingness;

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




   var unassignedCandidates = Candidates.find({prioritySite:{ $exists: false}}); // toggle switch
   var availableSites = Sites.find();
   var potentialAssignments = {};


    sAlert.success('Auto-match starting... !', undefined); // https://atmospherejs.com/juliancwirko/s-alert


    unassignedCandidates.forEach(function (candidate) {
        var candidatePlacementCount = 0;

        availableSites.forEach(function (site){
                                                  if (canBePlaced(candidate, site)){

//                                                      var candId = candidate._id;
                                                      
                                                      // Take note of the fact that this candidate can be assigned to this site
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

                                                      candidatePlacementCount++;
                                                  }
                                                }
        );

        // DEBUG
        //
        console.log("number of sites candidate can be placed is " + candidatePlacementCount);


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
    });
 
    // Now we should have a placement matrix 

    console.log("The placement matrix we've found is: ", potentialAssignments)
    // CALCULATE AND STORE SITE RATIOS FOR POTENTIAL PLACEMENTS FOR FINAL PLACEMENT

  
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
