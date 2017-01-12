
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const config = require('./server_config.json');

const app = express();
const EMAIL_ACCOUNT_USER = config.email;
const EMAIL_ACCOUNT_PASSWORD = config.password;
const YOUR_NAME = config.name;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

var transporter = nodemailer.createTransport(config.smtp);

app.post('/email', function(req, res, next) {
    let body = req.body;
    let email = {
        from: 'lex.graff@gmail.com',
        to: 'lex.graff@gmail.com',
        subject: 'contact from your portfolio',
        text: `You've receive a contact request from ${body.name} 
email : ${body.email}
phone : ${body.phone}
Message : ${body.message}
`,
    };
    transporter.sendMail(email, (err, results) => {
        if (err) {
            console.log(err);
            res.sendStatus(400)
        }    else {
            console.log(results);
            res.sendStatus(200)
        }
    })
});

app.listen(config.port, function() {
  console.log('listening on port ' + config.port);
})