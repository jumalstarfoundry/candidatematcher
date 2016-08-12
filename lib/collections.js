
Schemas = {};

Candidates = new Mongo.Collection("candidates");


Schemas.Candidates = new SimpleSchema({
  'First Name': {
    type: String,
  },
  'Last Name': {
    type: String,
  },
  prioritySite: {
    type: String,
    label: "Priority Site",
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
  priorityShift: {
    type: String,
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
    type: String,
      optional:true,
  },
  'Monday Start Time': {
    type: String,
      optional:true,
  },
  'Monday End Time': {
    type: String,
      optional:true,
  },
    'Tuesday Start Time': {
    type: String,
      optional:true,
  },
  'Tuesday End Time': {
    type: String,
      optional:true,
  },
    'Wednesday Start Time': {
    type: String,
      optional:true,
  },
  'Wednesday End Time': {
    type: String,
      optional:true,
  },
    'Thursday Start Time': {
    type: String,
      optional:true,
  },
  'Thursday End Time': {
    type: String,
      optional:true,
  },
    'Friday Start Time': {
    type: String,
      optional:true,
  },
  'Friday End Time': {
    type: String,
      optional:true,
  },
  'Returning Tutor?': {
    type: String,
      optional:true,
  },
    'Access to Car': {
    type: String,
      optional:true,
  },
    'Willing to Travel?': {
    type: String,
      optional:true,
  },
    'Languages Spoken': {
    type: String,
      optional:true,
  },
    'Age Group Preference': {
    type: String,
      optional:true,
  },
});

Candidates.attachSchema(Schemas.Candidates);


// ------ Sites ----------
Sites = new Mongo.Collection("sites");

Schemas = {};

Schemas.Sites = new SimpleSchema({
  name: {
    type: String,
    max: 60
  },
  description: {
    type: String,
    autoform: {
      rows: 5
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

});

Shifts.attachSchema(Schemas.Shifts);
