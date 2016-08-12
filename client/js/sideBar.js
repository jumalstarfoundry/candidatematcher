import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './../views/fileUpload.html';

Template.sideBar.helpers({
  userName() {
    var currentLoggedInUser = Meteor.user();
    var currentLoggedInUserName = null;

    if( currentLoggedInUser ){
      if( currentLoggedInUser.emails) {
        currentLoggedInUserName = currentLoggedInUser.emails[0].address;
      }
    }

    return currentLoggedInUserName;
  },
});


Template.sideBar.onRendered(function(){
  var ctx  = document.getElementById("sampleProfileImage").getContext("2d");

  /*
  var rand1 = 34;
  var rand2 = 65;
  var rand3 = 55;
  var data = [
    {
      value: rand1,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: "Red"
    },
    {
      value: rand2,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Green"
    },
    {
      value: rand3,
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "Yellow"
    }
  ]
  */

   var doughnutData = [
                {
                  value: 60,
                  color:"#68dff0"
                },
                {
                  value : 40,
                  color : "#444c57"
                }
              ];

  var doughnutOptions = {
    hover: {
      // Overrides the global setting
      enabled: false
    }
  };


  var myDoughnutChart = new Chart(ctx).Doughnut(doughnutData,  {
    showTooltips: false
  });


  /*
  var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: doughnutData,
    options: {
      hover: {
        // Overrides the global setting
        enabled: false
      }
    }
  });
*/

});
