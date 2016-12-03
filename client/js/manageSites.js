import { Template } from 'meteor/templating';
import './../views/manageSites.html';

Template.editSite.helpers({
  currentSite: function() {

    var currSite = Sites.findOne(FlowRouter.getParam('siteId'));

    if(!currSite){
      currSite = Sites.findOne({Site:FlowRouter.getParam('siteName')});
    }
    console.log("The current site is", currSite);

    return currSite;
  }
});


/*
Template.manageSites.helpers({
  sitesCollection: function() {
    return Sites;
  },
  settings: function() {
        var myCollection = Sites.find({});

        return {
            collection: myCollection,
            rowsPerPage: 10,
            showFilter: true,
            fields: ['name', 'description']
        };
    },
});
*/
