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

FlowRouter.route('/candidatesFileUpload', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "candidatesFileUpload"});

              console.log("Yeah! We are at the fileupload page:");

    }
});

FlowRouter.route('/sitesFileUpload', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
             BlazeLayout.render("mainLayout", {mainContent: "sitesFileUpload"});
    }
});

FlowRouter.route('/manageSites', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "manageSites"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});

FlowRouter.route('/editSite/:siteId', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "editSite"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});


FlowRouter.route('/editSite/bySiteName/:siteName', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "editSite"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});

FlowRouter.route('/addSite', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "addSite"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});


FlowRouter.route('/manageMatches', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "manageMatches"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});

FlowRouter.route('/editMatch/:matchId', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "editMatch"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});


FlowRouter.route('/addMatch', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "addMatch"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});




FlowRouter.route('/manageCandidates', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "manageCandidates"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});

FlowRouter.route('/editCandidate/:candidateId', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "editCandidate"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});


FlowRouter.route('/addCandidate', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "addCandidate"});

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


FlowRouter.route('/manageShift/:siteId', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "manageShifts"});

    }
});

FlowRouter.route('/editShift/:shiftId', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "editShift"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});


FlowRouter.route('/addShift', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "addShift"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});

// Future: autoselect site using site id
//
FlowRouter.route('/addShift/:siteId', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
      BlazeLayout.render("mainLayout", {mainContent: "addShift"});

    }
});

FlowRouter.route('/potentialAssignments', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],

    action: function(params) {
       // BlazeLayout.render("mainLayout", {area: "blog"});
             BlazeLayout.render("mainLayout", {mainContent: "potentialAssignments"});

              //console.log("Yeah! We are at the fileupload page:");

    }
});

//return Sites.findOne({_Site:siteName})._id;
