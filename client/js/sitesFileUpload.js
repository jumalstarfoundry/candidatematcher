import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './../views/sitesFileUpload.html';


Template.sitesUpload.onCreated( () => {
  Template.instance().sitesUploading = new ReactiveVar( false );
});

Template.sitesUpload.helpers({
  uploading() {
    return Template.instance().sitesUploading.get();
  }
});

Template.sitesUpload.events({
  'change [name="uploadCSV"]' ( event, template ) {

            console.log("sites upload starting...");

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        sAlert.success('Upload starting...', undefined); // https://atmospherejs.com/juliancwirko/s-alert

        Meteor.call( 'parseSitesUpload', results.data, ( error, response ) => {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.sitesUploading.set( false );
            
            //Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
            console.log("sites upload succeeded");
            sAlert.success('Sites Upload complete!', undefined); // https://atmospherejs.com/juliancwirko/s-alert

          }
        });
      }
    });
  }
});

