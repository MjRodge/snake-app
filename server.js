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
var authRoutes = require('./app/routes/auth');
app.use('/auth', authRoutes);


// launch ======================================================================
app.use(serveStatic('public', {'index': ['index.html', 'index.htm']}));
app.listen(port);
console.log('The magic happens on port ' + port);
