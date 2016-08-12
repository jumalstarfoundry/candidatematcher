/*
FlowRouter.route('/signin', {
    action: function() {
        console.log("Yeah! We are at the signin page:");
       BlazeLayout.render("mainLayout", {mainContent: "userSignIn"});
    }
});
*/

FlowRouter.route('/', {
 //   triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function() {
        console.log("Yeah! We are at the home page:");
       BlazeLayout.render("mainLayout", {mainContent: "welcome"});
    }
});

FlowRouter.route('/fileUpload', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "siteContent"});

              console.log("Yeah! We are at the fileupload page:");

    }
});

FlowRouter.route('/manageSites', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "insertSites"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});


/*
FlowRouter.route('/blog/:postId', {
    action: function(params, queryParams) {
        console.log("Yeah! We are on the post:", params.postId);
    }
});

*/