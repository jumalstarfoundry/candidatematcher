import { Template } from 'meteor/templating';
import './../views/manageMatches.html';

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

Template.manageMatches.events({
  "click #autoMatch": function() {

    // Loop through candidates
    //var unassignedCandidates = Candidates.find({prioritySite:{ $exists: false}}); // toggle switch

    // Grab all candidates, except for locked candidates - i.e., those who are
    // already in the match table with "locked" entries
    //
    var lockedCandidates = {}; // Grab any locked candidates that exist in the matches table
    var unlockedSelector = {}; // Select the candidates who are NOT in the locked candidates list
    var unmatchedCandidates = Candidates.find(unlockedSelector);

    // Seed the best guess list so far
    var bestMatchCollection =  {};
    var currentMatchCollection =  {};

    sAlert.success('Auto-match starting... !', undefined); // https://atmospherejs.com/juliancwirko/s-alert


    unmatchedCandidates.forEach(function (candidate) {
/*
      // lock the current candidate in, and vary the other candidates to see if it produces a better match ratio
      currentMatchCollection = {};

      getNextMatchSet()
      calculateMatchRatio()

      // If the current matchSet is better than the best we've found so far, update the matches collection
      //
      Matches.update(candidate._id, {$set:
                                     {prioritySite: findSite(candidate), priorityShift: findShift(candidate)}
                                    });
                                    */
      
      console.log("Looping through candidates");
    });

    sAlert.success('Auto-match complete!', undefined); // https://atmospherejs.com/juliancwirko/s-alert



  }
});
/*
// Try all assignments given that the current candidate is locked into a specific slot
function getNextMatchSet(currMatchSet, currCandidate, currSlot){

}

// Try try all slots for the current candidate
function getNextAssignmentMix(currMatchSet, currCandidate){

}
*/

Template.editCandidate.helpers({
  currentCandidate: function() {

    var currCandidate = Candidates.findOne(FlowRouter.getParam('candidateId'));
    console.log("The current candidate is", currCandidate);

    return currCandidate;
  }
});
