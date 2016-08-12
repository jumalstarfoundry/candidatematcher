import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './../views/fileUpload.html';


Template.upload.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.upload.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.upload.events({
  'change [name="uploadCSV"]' ( event, template ) {

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUpload', results.data, ( error, response ) => {
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
//new code starts here, in case you need to work from a place from where it works
Template.candidateOutput.helpers({
  candidate:function(){
    return Candidates.find();
  }
});

