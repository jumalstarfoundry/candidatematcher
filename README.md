Run Meteor 1.1 on Red Hat's OpenShift PaaS
====================================================================
This git repository is a sample Meteor base cartidge with can be used with your 
Meteor application to run it on openshift.com PaaS platform

The catridge would install NodeJS version 0.10.36

Step 0 
----------------------------------------------------------
1. Create on Openshift account at http://openshift.com/
2. Install rhc tools to manage your openshift account : 
        https://developers.openshift.com/en/managing-client-tools.html


Step 1 - Get NodeJS v0.10.36 running on your openshift app
----------------------------------------------------------

Create a new application `mynodeapp` in your openshift login control panel 
using the standard NodeJS 0.10 cartrige. 
You may choose to add auto-scaling while setting this up.
Choosing autoscaling would add an HAPProxy instance you your application. 

Now clone the git URL available on your application page to your local system
    
    git clone SOURCE_CODE_URL  mylocalnodeapp

Add this `github meteor-openshift` repository to mylocalnodeapp

    cd mylocalnodeapp
    git remote add upstream -m master git://github.com/sachinbhutani/meteor-openshift.git
    git pull -s recursive -X theirs upstream master

Then commit and push the repo to OpenShift

    git add --all
    git commit -a -m 'nodejs'
    git push

You should now have a NodeJs version 0.10.36  application running at:

    http://mynodeapp-mydomain.rhcloud.com
    ( See env @ http://mynodeapp-mydomain.rhcloud.com/env )

Check the URL http://mynodeapp-mydomain.rhcloud.com/env and save the environment variables to a local file.
You may need some of them if something goes wrong.

Step 2 Setup Mongo DB
------------------------------------------------------------
Create a MongoDB database at compose.io or mongolab.com 
If you want to run MongoDB on Openshift itself, refer to other projects to use Mongo 2.6/3.0 on Openshift

You should have a MONGO_URL ready to use with the app to proceed to next step, either running on OPENSHIFT or any other DB host

Step 2 Update env variables 
------------------------------------------------------------
Update the file `meteorshim.js` to use your own MONGO_URL env variable
MAIL_URL and other env variables may also be added as needed.

Step 3 Adding your Meteor App 
------------------------------------------------------------
Build your meteor app and un-bundle it into the `mylocalnodeapp` directory for pushing to OpenShift

The following steps need to be repeated each time you want to push an updated version of your meteor app to openshift 
you may create a shell script for it in your meteor repo 

Assuming your awesome meteor app repo is in dir mymeteorapp

    cd mymeteorapp 
    meteor build tarball
    cp tarball/mymeteorapp.tar.gz ~/path/to/mylocalnodeapp
    rm tarball/mymeteorapp.tar.gz
    cd ~/path/to/mylocalnodeapp
    tar -xvf mylocalnodeapp.tar.gz -s '/^bundle//'
    rm mymeteorapp.tar.gz
    git add --all
    git commit -a -m 'meteor-openshift'
    git push
    
After a lot of messages from the remote server, your awesome Meteor app should be finally running at 
    http://mynodeapp-mydomain.rhcloud.com


This repo has not been throughly tested, please report issues or suggest improvements.
