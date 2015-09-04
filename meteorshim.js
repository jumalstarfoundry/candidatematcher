#!/bin/env node
var fs = require('fs')

// Setup env
process.env.ROOT_URL = "http://"+process.env.OPENSHIFT_APP_DNS || "http://localhost";
process.env.MONGO_URL = "PROVIDE_MONGO_URL_PLEASE";
//process.env.MAL_URL = optional MAIL_URL and other env variables may be setup here 
process.env.PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
process.env.BIND_IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// Show connection details on startup
console.log("*********** Meteor Environment ************");
console.log("MONGO_URL IS: " + process.env.MONGO_URL);
console.log("ROOT_URL IS: " + process.env.ROOT_URL);
console.log("PORT: " + process.env.PORT);
console.log("BIND_IP: " + process.env.BIND_IP);

fs.stat('main.js', function(err, stat) {
// if the meteor application bundle is missing,
// return additional installation instructions:
if(!err)
{
  // Start meteor server
  console.log("************ Ready to START METEOR 1.1 SERVER  ************");
  require('./main.js');
}else{
  console.log("************ Starting NodeJS 0.10.36 SERVER  ************");
  require('./server.js');
}
});
