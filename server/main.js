import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  parseUpload( data ) {
    check( data, Array );

    Candidates.remove({});
    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          firstNameLookupKey = "First Name",
          firstNameLookupValue = item["First Name"],
          lastNameLookupKey = "Last Name",
          lastNameLookupValue = item["Last Name"];
         // exists = Candidates.findOne( { firstNameLookupKey: firstNameLookupValue, lastNameLookupKey: lastNameLookupValue  } );

        //console.log("item, key, val, exists are: ", item, lookupKey, lookupValue, exists);

      // If this row has not been inserted, and it has a firstname and lastName

     // if ( !exists && firstNameLookupValue && lastNameLookupValue) {
      if ( firstNameLookupValue && lastNameLookupValue) {

        /*
        // if there is no entry for site, add it as a blank item
        //
        if (!item.prioritySite)
          {
            item.prioritySite = "";
          }
        // if there is no entry for slot, add it
        //
        if (!item.priorityShift)
          {
            item.priorityShift = "";
          }
          */

        if (item['Monday Start Time'] == "Not Available") 
        {
          item['Monday Start Time'] = "";
          item['Monday End Time'] = "";
        }
        else
        {
          item['Monday Start Time'] = moment(item['Monday Start Time'],"H:mma").format("HH:mm");
          item['Monday End Time'] = moment(item['Monday Start Time'],"H:mma").format("HH:mm");
        } 

        if (item['Tuesday Start Time'] == "Not Available") 
        {
          item['Tuesday Start Time'] = "";
          item['Tuesday End Time'] = "";
        } 
        else
        {
          item['Tuesday Start Time'] = moment(item['Tuesday Start Time'],"H:mma").format("HH:mm");
          item['Tuesday End Time'] = moment(item['Tuesday Start Time'],"H:mma").format("HH:mm");
        } 

        if (item['Wednesday Start Time'] == "Not Available") 
        {
          item['Wednesday Start Time'] = "";
          item['Wednesday End Time'] = "";
        } 
        else
        {
          item['Wednesday Start Time'] = moment(item['Wednesday Start Time'],"H:mma").format("HH:mm");
          item['Wednesday End Time'] = moment(item['Wednesday Start Time'],"H:mma").format("HH:mm");
        } 

        if (item['Thursday Start Time'] == "Not Available") 
        {
          item['Thursday Start Time'] = "";
          item['Thursday End Time'] = "";
        } 
        else
        {
          item['Thursday Start Time'] = moment(item['Thursday Start Time'],"H:mma").format("HH:mm");
          item['Thursday End Time'] = moment(item['Thursday Start Time'],"H:mma").format("HH:mm");
        } 

        if (item['Friday Start Time'] == "Not Available") 
        {
          item['Friday Start Time'] = "";
          item['Friday End Time'] = "";
        } 
        else
        {
          item['Friday Start Time'] = moment(item['Friday Start Time'],"H:mma").format("HH:mm");
          item['Friday End Time'] = moment(item['Friday Start Time'],"H:mma").format("HH:mm");
        } 

        Candidates.insert( item );
      } else {
        console.warn( 'Row upload rejected. This item does not have a first name or last name.' );
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