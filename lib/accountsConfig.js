AccountsTemplates.configure({
  defaultTemplate: 'mainLayout',
  defaultLayoutRegions: {mainContent:'welcome'}
});

/*
// Define these routes in a file loaded on both client and server
AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin'
});
*/
AccountsTemplates.configureRoute('signIn', {
  layoutType: 'blaze',
  name: 'signin',
  path: '/login',
  template: 'userSignIn',
  layoutTemplate: 'mainLayout',
  contentRegion: 'mainContent'
});

/*
AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join'
});
*/

//AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password'
});

//FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);