import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './../views/fileUpload.html';

Template.sideBar.helpers({
  userName() {
    var currentLoggedInUser = Meteor.user();
    var currentLoggedInUserName = null;

    if( currentLoggedInUser ){
      if( currentLoggedInUser.emails) {
        currentLoggedInUserName = currentLoggedInUser.emails[0].address;      
      }
    }

    return currentLoggedInUserName;
  },
});

