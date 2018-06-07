// set up ======================================================================
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');

// Configure dotenv package to bring in DB location
require('dotenv').config();
var host = process.env.DB_HOST;

// configuration ===============================================================
mongoose.connect(host, function(error){
  if(error)
    console.log(error);

  console.log("connection successful");
}); // connect to the database


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
