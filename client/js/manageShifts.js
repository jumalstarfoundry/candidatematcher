import { Template } from 'meteor/templating';
import './../views/manageShifts.html';

Template.editShift.helpers({
  currentShift: function() {

    var currShift = Shifts.findOne({siteId:FlowRouter.getParam('siteId')});
    console.log("The current Shift is", currShift);

    return currShift;
  }
});

Template.manageShifts.helpers({
  shiftSelector: function() {

    var shiftSelector = {siteId: FlowRouter.getParam('siteId')};
    console.log("Shift selector is: ", shiftSelector);
    return shiftSelector;
  },
  currentSiteId: function(){
    return FlowRouter.getParam('siteId');
  }
});

