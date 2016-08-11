import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  parseUpload( data ) {
    check( data, Array );

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          firstNameLookupKey = "First Name",
          firstNameLookupValue = item["First Name"],
          lastNameLookupKey = "Last Name",
          lastNameLookupValue = item["Last Name"],
          exists = Candidates.findOne( { firstNameLookupKey: firstNameLookupValue, lastNameLookupKey: lastNameLookupValue  } );

        //console.log("item, key, val, exists are: ", item, lookupKey, lookupValue, exists);

      // If this row has not been inserted, and it has a firstname and lastName
      if ( !exists && firstNameLookupValue && lastNameLookupValue) {
        Candidates.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists.' );
      }
    }
  }
});

//Houston.add_collection(Sites);

/*Houston.methods("Candidates", {
  "candidateInfo_fromCSV": function (post) {
    Candidates.find(post._id, {$set: {published: true}});
    return post.name + " published successfully.";
  }
}); */
/*lines 25-30, added this method to publish Candidates collection on the houston admin. still not sure exactly that this did. after commenting these lines out, reseting meteor, uploading the csv again and then opening the houston admin, the "candidateInfo_fromCSV" collection displays--but only the first row. none of the values from rows after the first ones are displaying. just a note, but not sure if this was even on the right path. *bél* */