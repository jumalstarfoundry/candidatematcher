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

// Check Monday schedule
if ((candidate['Monday Start Time'] >= site.mondayStart) && (candidate['Monday End Time'] < site.mondayEnd)) {
  availableNumberOfDays++;
}

// Check Tuesday schedule

// Check Wednesday schedule

// Check Thursday schedule

// Check Friday schedule

return true;
} 

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
        if(candidatePlacementCount >= 1){
          Candidates.update(candidate._id, {$set: { matchPriority: 1/candidatePlacementCount*1000+1000 }});
          }
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
