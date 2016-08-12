Meteor.publish('sites.public', function() {
  return Sites.find({},
    {
      fields: {'name':1}
    });

});


