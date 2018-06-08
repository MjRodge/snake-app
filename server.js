// set up ======================================================================
var express      = require('express');
var serveStatic  = require('serve-static');
var app          = express();
var port         = process.env.PORT || 8080;
var mongoose     = require('mongoose');
var passport     = require('passport');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// Configure dotenv package to bring in DB location
require('dotenv').config();
var host = process.env.DB_HOST;

// configuration ===============================================================
mongoose.connect(host, function(error){
  if(error)
    console.log(error);

  console.log("connection successful");
}); // connect to the database

// routes ======================================================================
// middleware to use for all requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Added to resolve CORS issue
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

var authRoutes = require('./app/routes/auth');
app.use('/auth', authRoutes);


// launch ======================================================================
app.use(serveStatic('public', {'index': ['index.html', 'index.htm']}));
app.listen(port);
console.log('The magic happens on port ' + port);
