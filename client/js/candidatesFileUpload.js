import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './../views/candidatesFileUpload.html';


Template.candidateUpload.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.candidateUpload.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.candidateUpload.events({
  'change [name="uploadCSV"]' ( event, template ) {

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        sAlert.success('Upload starting...', undefined); // https://atmospherejs.com/juliancwirko/s-alert

        Meteor.call( 'parseCandidatesUpload', results.data, ( error, response ) => {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            
            //Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
            console.log("upload succeeded");
            sAlert.success('Upload complete!', undefined); // https://atmospherejs.com/juliancwirko/s-alert

          }
        });
      }
    });
  }
});

