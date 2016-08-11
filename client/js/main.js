import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './../views/main.html';

Meteor.startup(function () {

    sAlert.config({
        effect: '',
        position: 'top-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });

});
Template.topBar.events({
	'click .logout': function(event){
		event.preventDefault();
		AccountsTemplates.logout();
	}

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

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
