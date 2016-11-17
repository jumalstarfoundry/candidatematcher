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

var canBePlaced = function(candidate, site, minimumNumberOfDays) {

    // For each day, compare candidate start and end times to site start and end times
    var availableNumberOfDays = 0;
    var candidateStartTime, candidateEndTime;
    var siteStartTime, siteEndTime;

    var candidateMatchesWithSite = function(day, candidateToCheck, siteToCheck)
      {
          candidateStartTime = candidateToCheck[day.charAt(0).toUpperCase() + day.substr(1) + " Start Time"];
          candidateEndTime = candidateToCheck[day.charAt(0).toUpperCase() + day.substr(1) + " End Time"];
          siteStartTime = siteToCheck[day.charAt(0).toLowerCase() + day.substr(1) + "Start"];
          siteEndTime = siteToCheck[day.charAt(0).toLowerCase() + day.substr(1) + "End"];

        const minimumMillsecondsToWork = 3600000; // 1 hour
        var candidateCanShowUpBeforeClosing = moment(siteEndTime, "HH:mm").diff(moment(candidateStartTime, "HH:mm")) >= 0;
        var candidateCanLeaveAfterOpening =  moment(candidateEndTime, "HH:mm").diff(moment(siteStartTime, "HH:mm")) >= 0;
        var timeAvailableForWork = moment(candidateEndTime, "HH:mm").diff(moment(candidateStartTime, "HH:mm"));

        console.log(candidate["First Name"] + " " + candidate["Last Name"] + " can show up before closing: ", candidateCanShowUpBeforeClosing);
        console.log(candidate["First Name"] + " " + candidate["Last Name"] + " can leave after opening: ", candidateCanLeaveAfterOpening);
        
        return candidateCanShowUpBeforeClosing && candidateCanLeaveAfterOpening && (timeAvailableForWork >= minimumMillsecondsToWork);

      }

      if(candidateMatchesWithSite("Monday", candidate, site))
      {
        availableNumberOfDays++;
      }

      if(candidateMatchesWithSite("Tuesday", candidate, site))
      {
        availableNumberOfDays++;
      }  

      if(candidateMatchesWithSite("Wednesday", candidate, site))
      {
        availableNumberOfDays++;
      }  

      if(candidateMatchesWithSite("Thursday", candidate, site))
      {
        availableNumberOfDays++;
      }  

      if(candidateMatchesWithSite("Friday", candidate, site))
      {
        availableNumberOfDays++;
      }  

      console.log("available number of days is ", availableNumberOfDays);

return availableNumberOfDays >= minimumNumberOfDays;

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
   var minDaysToBeAvailable = 2;


    sAlert.success('Auto-match starting... !', undefined); // https://atmospherejs.com/juliancwirko/s-alert


    unassignedCandidates.forEach(function (candidate) {
        var candidatePlacementCount = 0;

        availableSites.forEach(function (site){
                                                  if (canBePlaced(candidate, site, minDaysToBeAvailable)){
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
