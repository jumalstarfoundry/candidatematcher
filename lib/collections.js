

Schemas = {};

Candidates = new Mongo.Collection("candidates");


Schemas.Candidates = new SimpleSchema({
  'First Name': {
    type: String,
  },
  'Last Name': {
    type: String,
  },
    /*
     matchPriority: {
      type: Number,
      label: "Placement Priority (lowest gets matched first)",
      optional: true,
    },
     */
  prioritySite: {
    type: String,
    label: "Priority Site",
    optional:true,
    autoform: {
      type: "select",
      options: function () {
          // Grab all courses, then pluck to a list of course
          // titles and associated courseIds with underscore
          //
          const selector = {};
          const options = {fields: {_id:1, Site: 1}};
          var allCoursesDict = Sites.find(selector, options).fetch();
          var selectArrayCreationFunction = function(element, index, list){return {label: element.Site, value:element._id}};

          return _.map(allCoursesDict, selectArrayCreationFunction);
        ;
      }
    }
},
  /*
  priorityShift: {
    type: String,
    optional:true,
    label: "Priority Shift",
    autoform: {
      type: "select",
      options: function () {
          // Grab all courses, then pluck to a list of course
          // titles and associated courseIds with underscore
          //
          const selector = {};
          const options = {fields: {_id:1, name: 1}};
          var allCoursesDict = Shifts.find(selector, options).fetch();
          var selectArrayCreationFunction = function(element, index, list){return {label: element.name, value:element._id}};

          return _.map(allCoursesDict, selectArrayCreationFunction);
        ;
      }
    }
  },
  */
  'Major-Picklist': {
    type: String,
      optional:true,
  },
  'Position_Site_Preference1': {
    type: String,
      optional:true,
  },
  'Position_Site_Preference2': {
    type: String,
      optional:true,
  },
  'Position_Site_Preference3': {
    type: String,
      optional:true,
  },
  'Preferred Volunteer Status': {
    type: String,
      optional:true,
  },
  'Number of Days to Work': {
    type: Number,
    defaultValue: 0,
    allowedValues: [0, 1, 2, 3, 4, 5, 6, 7],
    optional:false,
  },
  'Monday Start Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }

  },
  'Monday End Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
    'Tuesday Start Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Tuesday End Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
    'Wednesday Start Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Wednesday End Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
    'Thursday Start Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Thursday End Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
    'Friday Start Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Friday End Time': {
    type: String,
      optional:true,
      autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Returning Tutor?': {
    type: String,
    optional:true,
    allowedValues:['Yes', 'No']

  },
    'Access to Car': {
    type: String,
      optional:true,
      allowedValues:['Yes', 'No']

  },
 'Willing to Travel?': { // Question marks match the csv export file titles, though likely unneeded
    type: String,
      optional:false,
      defaultValue: 'No',
      allowedValues:['Yes', 'No']
  },
    'Languages Spoken': {
    type: String,
      optional:false,
      defaultValue: 'None',
  },
    'Age Group Preference': {
    type: String,
      optional:true,
  },
    notes: {
    type: String,
    optional: true,
    autoform: {
      rows: 5,
      afFieldInput: {
        type: 'summernote'// , settings: // summernote options goes here
      }
    }
  },
});

Candidates.attachSchema(Schemas.Candidates);


// ------ Sites ----------

const maxPositionsAvailable = 100;

Sites = new Mongo.Collection("sites");

Schemas = {};

Schemas.Sites = new SimpleSchema({
  'Site': {
    type: String,
    max: 60
  },
  description: {
    type: String,
    optional: true,
    autoform: {
      rows: 5,
      afFieldInput: {
        type: 'summernote',
//        settings: // summernote options goes here
      }
    }
  },
  'Mon Start Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Mon End Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Tues Start Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Tues End Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Wed Start Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Wed End Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Thur Start Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Thur End Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Fri Start Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Fri End Time': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  'Positions Available': {
    type: Number,
    optional: true,
    autoform: {
      type: "selectize",
      options: function(){
        var allOptionsArray = [];
        var getLabelFromNumber = function(num){

          // If there's only 1 digit, add a 0 for sort purposes
          //
          if(num)
            {
              if(num < 10) return "0"+num;
               else return num+"";
            }
          else
            {
              return "0 (None)";
            }

        }

        for (i = 0; i < maxPositionsAvailable; i++)
          {
            allOptionsArray.push({label:getLabelFromNumber(i), value:i});
          };

        return allOptionsArray;
      },
      selectizeOptions: {
        plugins: {
          "remove_button": {}
        }
      }
    }
  },/*
  requiresTravel: {
    type: String,
    defaultValue: 'No',
    optional: false,
    allowedValues: ['Yes', 'No']
  }*/

  /*  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function () {
        return _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  } */

});

Sites.attachSchema(Schemas.Sites);
/*
Schemas.Candidates = new SimpleSchema({
  "First Name": {
    type: String
  },
 "Last Name": {
    type: String
  },
   "First Name": {
    type: String
  },
});
*/
//Candidates.attachSchema(Schemas.Candidates)


// ------ Shifts ----------

/*

Shifts = new Mongo.Collection("shifts");

Schemas = {};

Schemas.Shifts = new SimpleSchema({
  siteId: {
    type: String,
    label: "Site",
    autoform: {
      type: "select",
      options: function () {
          // Grab all courses, then pluck to a list of course
          // titles and associated courseIds with underscore
          //
          const selector = {};
          const options = {fields: {_id:1, name: 1}};
          var allCoursesDict = Sites.find(selector, options).fetch();
          var selectArrayCreationFunction = function(element, index, list){return {label: element.name, value:element._id}};

          return _.map(allCoursesDict, selectArrayCreationFunction);
        ;
      }
    }
},
  name: {
    type: String
  },
  mondayStart: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  mondayEnd: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  tuesdayStart: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  tuesdayEnd: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  wednesdayStart: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  wednesdayEnd: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  thursdayStart: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  thursdayEnd: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  fridayStart: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
  fridayEnd: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },
//  tags: {
//    type: String,
//   autoform: {
//      type: "selectize",
//      multiple: true,
//      options: function () {
//        return [
//         {label: "2013", value: 2013},
//          {label: "2014", value: 2014},
//          {label: "2015", value: 2015}
//        ];
//      },
//      selectizeOptions: {
//        hideSelected: true,
//        plugins: {
//         "remove_button": {}
//        }
//      }
//    }
//  },
//  positionsAvailable: {
    type: Number,
    optional: true,
    autoform: {
      type: "selectize",
      options: function(){
        var allOptionsArray = [];
        var getLabelFromNumber = function(num){

          // If there's only 1 digit, add a 0 for sort purposes
          //
          if(num)
            {
              if(num < 10) return "0"+num;
               else return num+"";
            }
          else
            {
              return "0 (None)";
            }

        }

        for (i = 0; i < maxPositionsAvailable; i++)
          {
            allOptionsArray.push({label:getLabelFromNumber(i), value:i});
          };

        return allOptionsArray;
      },
      selectizeOptions: {
        plugins: {
          "remove_button": {}
        }
      }
    }
//  }

});

Shifts.attachSchema(Schemas.Shifts);
*/
// ------ Matches ----------
Matches = new Mongo.Collection("matches");

Schemas = {};

Schemas.Matches = new SimpleSchema({
  name: {
    type: String,
    max: 60
  },

  description: {
    type: String,
    optional: true,
    autoform: {
      rows: 5,
      afFieldInput: {
        type: 'summernote',
//        settings: // summernote options goes here
      }
    }
  },

  /*  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function () {
        return _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  } */

});

Matches.attachSchema(Schemas.Matches);
