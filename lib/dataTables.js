import Tabular from 'meteor/aldeed:tabular';

TabularTables = {};

TabularTables.Sites = new Tabular.Table({
  name: "Sites",
  collection: Sites,
  responsive: true,
  autoWidth: false,
  columns: [
    {data: "Site", title: "Site"},
    {data: "description", title: "Description"},
    {
      tmpl: Meteor.isClient && Template.editSiteButton
    }
  ]
});

TabularTables.Candidates = new Tabular.Table({
  name: "Candidates",
  collection: Candidates,
  responsive: true,
  autoWidth: false,
  columns: [
    {data: "First Name", title: "First Name"},
    {data: "Last Name", title: "Last Name"},
  /*  
  {data: "matchPriority", title:"Placement Priority"},
   */
    {data: "prioritySite",
     title: "Priority Site",
     render: function (val, type, doc) {
       var siteName = null;
       if(val){
         console.log("Sites val is", val);
         siteName = Sites.findOne(val).name;
       }
       return siteName;
     }
    },
    {data:"notes", title: "Notes"},

    {
      tmpl: Meteor.isClient && Template.editCandidateButton
    }
  ]
});

/*
TabularTables.Shifts = new Tabular.Table({
  name: "Shifts",
  collection: Shifts,
  autoWidth: false,
  columns: [
    {data: "name", title: "Shift Name"},
    {data: "mondayStart", title: "Monday Start Time"},
    {data: "mondayEnd", title: "Monday End Time"},
    {data: "tuesdayStart", title: "Tuesday Start Time"},
    {data: "tuesdayEnd", title: "Tuesday End Time"},
    {data: "wednesdayStart", title: "Wednesday Start Time"},
    {data: "wednesdayEnd", title: "Wednesday End Time"},
    {data: "thursdayStart", title: "Thursday Start Time"},
    {data: "thursdayEnd", title: "Thursday End Time"},
    {data: "fridayStart", title: "Friday Start Time"},
    {data: "fridayEnd", title: "Friday End Time"},


    {
      tmpl: Meteor.isClient && Template.editShiftButton
    }
  ]
});
*/

TabularTables.Matches = new Tabular.Table({
  name: "Matches",
  collection: Matches,
  autoWidth: false,
  columns: [
    {data: "name", title: "Match Name"}
  ]
});