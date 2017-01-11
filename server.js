
var express = require('express');
var session = require('express-session');
var config = require('./server_config.json');

var app = express();

app.use(express.static('public'));

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true
}));

app.listen(config.port, function() {
  console.log('listening on port ' + config.port);
})