import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  downloadCandidates: function() {
    var collection = Candidates.find().fetch();
    var heading = true; // Optional, defaults to true
    var delimiter = "\t" ;//";" // Optional, defaults to ",";

    // convert siteIds to actual names of sites
    //
    var noCommaArray = _.map(collection, function(rowObj){
      var newCell  = "";
      var newRowObj = {};
      for (var colName in rowObj){

        // Ensure that sites are human readible
        //
        if(colName == "prioritySite")
        {
          rowObj[colName] = Sites.findOne(rowObj[colName]+"").Site;
        }

        noCommaCell = (rowObj[colName]+"").replace(/,/g, "-");
        newRowObj[colName] = noCommaCell;


      }
      return newRowObj;
    });
    ///console.log("Here's the no comma array", noCommaArray);

    return exportcsv.exportToCSV(noCommaArray, heading, delimiter);
  },
  parseCandidatesUpload( data ) {
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
          item['Monday Start Time'] = "00:00";
          item['Monday End Time'] = "00:00";
        }
        else
        {
          item['Monday Start Time'] = moment(item['Monday Start Time'],"H:mma").format("HH:mm");
          item['Monday End Time'] = moment(item['Monday End Time'],"H:mma").format("HH:mm");
        }

        if (item['Tuesday Start Time'] == "Not Available")
        {
          item['Tuesday Start Time'] = "00:00";
          item['Tuesday End Time'] = "00:00";
        }
        else
        {
          item['Tuesday Start Time'] = moment(item['Tuesday Start Time'],"H:mma").format("HH:mm");
          item['Tuesday End Time'] = moment(item['Tuesday End Time'],"H:mma").format("HH:mm");
        }

        if (item['Wednesday Start Time'] == "Not Available")
        {
          item['Wednesday Start Time'] = "00:00";
          item['Wednesday End Time'] = "00:00";
        }
        else
        {
          item['Wednesday Start Time'] = moment(item['Wednesday Start Time'],"H:mma").format("HH:mm");
          item['Wednesday End Time'] = moment(item['Wednesday End Time'],"H:mma").format("HH:mm");
        }

        if (item['Thursday Start Time'] == "Not Available")
        {
          item['Thursday Start Time'] = "00:00";
          item['Thursday End Time'] = "00:00";
        }
        else
        {
          item['Thursday Start Time'] = moment(item['Thursday Start Time'],"H:mma").format("HH:mm");
          item['Thursday End Time'] = moment(item['Thursday End Time'],"H:mma").format("HH:mm");
        }

        if (item['Friday Start Time'] == "Not Available")
        {
          item['Friday Start Time'] = "00:00";
          item['Friday End Time'] = "00:00";
        }
        else
        {
          item['Friday Start Time'] = moment(item['Friday Start Time'],"H:mma").format("HH:mm");
          item['Friday End Time'] = moment(item['Friday End Time'],"H:mma").format("HH:mm");
        }

        let candidateToInsert = {}

        candidateToInsert["First Name"] = item["First Name"];//? item["First Name"] : "Empty";
        candidateToInsert["Last Name"] = item["Last Name"];// ? item["Last Name"] : "Empty";
        candidateToInsert["Position_Site_Preference1"] = item["Position_Site_Preference1"] ? item["Position_Site_Preference1"] : "Empty";
        candidateToInsert["Position_Site_Preference2"] = item["Position_Site_Preference2"] ? item["Position_Site_Preference2"] : "Empty";
        candidateToInsert["Position_Site_Preference3"] = item["Position_Site_Preference3"] ? item["Position_Site_Preference3"] : "Empty";
        candidateToInsert["Preferred Volunteer Status"] = item["Preferred Volunteer Status"] ? item["Preferred Volunteer Status"] : "Empty";
        candidateToInsert["Number of Days to Work"] = item["Number of Days to Work"] ? item["Number of Days to Work"]: 0;
        candidateToInsert["Monday Start Time"] = item["Monday Start Time"];
        candidateToInsert["Monday End Time"] = item["Monday End Time"];
        candidateToInsert["Tuesday Start Time"] = item["Tuesday Start Time"];
        candidateToInsert["Tuesday End Time"] = item["Tuesday End Time"];
        candidateToInsert["Wednesday Start Time"] = item["Wednesday Start Time"];
        candidateToInsert["Wednesday End Time"] = item["Wednesday End Time"];
        candidateToInsert["Thursday Start Time"] = item["Thursday Start Time"];
        candidateToInsert["Thursday End Time"] = item["Thursday End Time"];
        candidateToInsert["Friday Start Time"] = item["Friday Start Time"];
        candidateToInsert["Friday End Time"] = item["Friday End Time"];
        candidateToInsert["Returning Tutor"] = item["Returning Tutor?"]? item["Returning Tutor?"] : "No";
        candidateToInsert["Access to Car"] = item["Access to Car"]? item["Access to Car"] : "No";
        candidateToInsert["Willing to Travel"] = item["Willing to Travel?"] ? item["Willing to Travel?"] : "No";
        candidateToInsert["Languages Spoken"] = item["Languages Spoken"] ? item["Languages Spoken"] : "Empty";
        candidateToInsert["Age Group Preference"] = item["Age Group Preference"] ? item["Age Group Preference"] : "Empty";
        candidateToInsert["Graduation Year"] = item["Graduation Year"] ? item["Graduation Year"]: "Empty";

        // Match site in file upload to site currently in system
        let assignedPrioritySite = Sites.findOne({Site: item["prioritySite"]});

        if(assignedPrioritySite){
          candidateToInsert["prioritySite"] = assignedPrioritySite._id;          
        } // else, defaultValue in schema will assign candidate to *Pending site


        Candidates.insert( candidateToInsert );
      } else {
        console.warn( 'Row upload rejected. This item does not have a first name or last name.' );
      }

    }
  },
   parseSitesUpload( data ) {
    check( data, Array );

    Sites.remove({});
    Sites.insert({_id: "pending", Site:"*Pending"});
    Sites.insert({_id: "unassigned", Site: "*Unassigned"});

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ];
      let itemIsValidSite = true; // Later on, can check to see if the item is a valid site

      if ( itemIsValidSite ) {

        if (item['Mon Start Time'] == "")
        {
          item['Mon Start Time'] = "";
          item['Mon End Time'] = "";
        }
        else
        {
          item['Mon Start Time'] = moment(item['Mon Start Time'],"H:mma").format("HH:mm");
          item['Mon End Time'] = moment(item['Mon End Time'],"H:mma").format("HH:mm");
        }

        if (item['Tues Start Time'] == "")
        {
          item['Tues Start Time'] = "";
          item['Tues End Time'] = "";
        }
        else
        {
          item['Tues Start Time'] = moment(item['Tues Start Time'],"H:mma").format("HH:mm");
          item['Tues End Time'] = moment(item['Tues End Time'],"H:mma").format("HH:mm");
        }

        if (item['Wed Start Time'] == "")
        {
          item['Wed Start Time'] = "";
          item['Wed End Time'] = "";
        }
        else
        {
          item['Wed Start Time'] = moment(item['Wed Start Time'],"H:mma").format("HH:mm");
          item['Wed End Time'] = moment(item['Wed End Time'],"H:mma").format("HH:mm");
        }

        if (item['Thur Start Time'] == "")
        {
          item['Thur Start Time'] = "";
          item['Thur End Time'] = "";
        }
        else
        {
          item['Thur Start Time'] = moment(item['Thur Start Time'],"H:mma").format("HH:mm");
          item['Thur End Time'] = moment(item['Thur End Time'],"H:mma").format("HH:mm");
        }

        if (item['Fri Start Time'] == "")
        {
          item['Fri Start Time'] = "";
          item['Fri End Time'] = "";
        }
        else
        {
          item['Fri Start Time'] = moment(item['Fri Start Time'],"H:mma").format("HH:mm");
          item['Fri End Time'] = moment(item['Fri End Time'],"H:mma").format("HH:mm");
        }


        Sites.insert( item );
      } else {
        console.warn( 'Row upload rejected... Site does not conform to our rules for a valid site' );
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
