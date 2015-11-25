// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose 	   = require('mongoose');
var methodOverride = require('method-override');

// configuration ===========================================
    
// config files
var db = require('./config/db');

// set our ports
//var ipaddr = process.env.OPENSHIFT_INTERNAL_IP;
var port = process.env.PORT || 8080; 
//var port = process.env.PORT || process.env.OPENSHIFT_INTERNAL_PORT || 8080; 

// connect to our mongoDB database
mongoose.connect(db.url); 
var dbconn = mongoose.connection;
dbconn.on('error', console.error.bind(console, 'connection error:'));
dbconn.once('open', function (callback) {
  // yay!
});

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
//app.listen(port);
//app.start(port, ipaddr); //new

// shoutout to the user                     
console.log('Magic happens on port ' + port);
//app.log.info("Started at http://" + ipaddr + ":" + port + "/");

// expose app           
exports = module.exports = app;
