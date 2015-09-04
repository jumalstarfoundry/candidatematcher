Run Meteor 1.1 on Red Hat's OpenShift PaaS
====================================================================
This git repository is a sample Meteor base cartidge with can be used with your 
Meteor application to run it on openshift.com PaaS platform

The catridge would install NodeJS version 0.10.36

Step 0 
----------------------------------------------------------
1. Create on Openshift account at http://openshift.redhat.com/
2. Install rhc tools to manage your openshift account : 
        https://developers.openshift.com/en/managing-client-tools.html


Step 1 - Get NodeJS v0.10.36 running on your openshift app
----------------------------------------------------------

Create a namespace on your openshift account, if you haven't already do so

    rhc domain create mydomain

Create a nodejs application (you can name it anything via -a)

    rhc app create -a mynodeapp -t nodejs-0.10

Navigate to your application page at openshift.com and clone your app to a local directory using the source code SSH URL
    
    git clone SOURCE_CODE_URL  mylocalnodeapp

Add this `github meteor-openshift` repository

    cd mylocalnodeapp
    git remote add upstream -m master git://github.com/sachinbhutani/meteo-openshift.git
    git pull -s recursive -X theirs upstream master

Then push the repo to OpenShift

    git push

You should now have a NodeJs version 0.10.36  application running at:

    http://mynodeapp-<mynamespace>.rhcloud.com
    ( See env @ http://mynodeapp-$mynamespace.rhcloud.com/env )

Check the URL http://mynodeapp-<mynamespace>.rhcloud.com/env and save the environment variables to a local file.

Step 2 Setup Mongo DB
------------------------------------------------------------
Create a MongoDB database at compose.io or mongolab.com 
If you want to run MongoDB on Openshift itself, refer to other projects to use Mongo 2.6/3.0 on Openshift

You should have a MONGO_URL ready to use with the app, either running on OPENSHIFT or anyother DB-host

Step 2 Update env variables 
------------------------------------------------------------
Open the file `meteorshim.js` to use your own MONGO_URL env variable
MAIL_URL may also be added if needed.

Step 3 Adding your Meteor App 
------------------------------------------------------------
Build your meteor app and un-bundle it into the openshift directory for pushing to OpenShift

The following steps need to be repeated each time you want to push an updated version of your meteor app to openshift 
you may create a shell script for it in yoru meteor repo 

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
    
After a lot of messages from the remote server, your Meteor app should be finally running at 
    http://mynodeapp-<mynamespace>.rhcloud.com

    
