
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
var config = require('./server_config.json');

const app = module.exports = express();
const EMAIL_ACCOUNT_USER = config.email;
const EMAIL_ACCOUNT_PASSWORD = config.password;
const YOUR_NAME = config.name;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ACCOUNT_USER,
    pass: EMAIL_ACCOUNT_PASSWORD
  }
});

app.post('/email', function(req, res, next) {
  smtpTransport.sendMail({
    from: `${YOUR_NAME} ${EMAIL_ACCOUNT_USER}`,
    to: 'lex.graff@gmail.com',
    subject: 'Message from Portfolio Site',
    text: `From: ${req.body.name} at ${req.body.email}. ${req.body.message}, and their phone number is ${req.body.number}`
  }, function(error, response) {
    if (error) {
      console.log(error);
      res.sendStatus(204);
    } else {
      res.sendStatus(200);
    }
    smtpTransport.close();
  });
});

app.listen(config.port, function() {
  console.log('listening on port ' + config.port);
})