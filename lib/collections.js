Candidates = new Mongo.Collection("candidates");
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
