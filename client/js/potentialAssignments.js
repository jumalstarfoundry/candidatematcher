import { Template } from 'meteor/templating';
import './../views/potentialAssignments.html';
import _ from 'underscore';


Template.potentialAssignments.helpers({
  potentialAssignmentsList: function() {

    var sitesArray = [];
    var potAssignments = Session.get('potentialAssignmentsSessionVar');



    for (var siteName in potAssignments) {

      var candidatesAtSite = [];

      //delete potAssignments.placementCount;

      console.log("site:", potAssignments[siteName]);

      // Create a candidates array
      for (var candidateId in potAssignments[siteName])
      {
        var candidate = {};

        // Prepare the candidate object
        //
        candidate["_id"] = candidateId;

        // Get rid of placementCount as a field 
        //
        delete potAssignments[siteName]["placementCount"];

        for(var candidateField in potAssignments[siteName][candidateId])
        {
          candidate[candidateField] = potAssignments[siteName][candidateId][candidateField];
        }

        candidatesAtSite.push(candidate);
      }

      //console.log(potAssignments[siteName]);

      var nextSite = {site: siteName, candidates: candidatesAtSite};
      sitesArray.push(nextSite);
    }

    //var arr = Object.keys(potAssignments).map(function (key) { return potAssignments[key]; });
    return sitesArray;
  }
});
