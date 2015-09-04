Run Meteor 1.1 on Red Hat's OpenShift PaaS
====================================================================
This git repository is a sample Meteor base cartidge with can be used with your 
Meteor application to run it on openshift.com PaaS platform

The catridge would install NodeJS version 0.10.36

Step 0
----------------------------------------------------------
1. Create on Openshift account at http://openshift.redhat.com/
2. Install rhc tool to manage your openshift account 


Step 1 - Get NodeJS v0.10.36 running on your openshift app
----------------------------------------------------------

Create a namespace on your openshift account, if you haven't already do so

    rhc domain create <mynamespace>

Create a nodejs application (you can name it anything via -a)

    rhc app create -a mynodeapp  -t nodejs-0.10

Add this `github meteor-openshift` repository

    cd mylocalnodeapp
    git remote add upstream -m master git://github.com/sachinbhutani/meteo-openshift.git
    git pull -s recursive -X theirs upstream master

Then push the repo to OpenShift

    git push

You should now have a NodeJs 0.10.36 version application running at:

    http://mynodeapp-<mynamespace>.rhcloud.com
    ( See env @ http://palinode-$yournamespace.rhcloud.com/env )

Check the URL http://mynodeapp-<mynamespace>.rhcloud.com/env and save the environment variables to a local file.

Step 2 Adding your Meteor App 
------------------------------------------------------------
