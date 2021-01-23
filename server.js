var express = require("express");
var app = express();
var nodemailer = require('nodemailer');
var router = express.Router();
var cors = require("cors");
var config = require("./config.js");


var transport = {
    host: config.SMTP.Host,
    port: config.SMTP.Port,
    secure: false,
    auth: {
        user: config.SMTP.Auth.User,
        pass: config.SMTP.Auth.Password,
    }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages!");
    }
});

router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var phone = req.body.phone
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n phone: ${phone} \n message: ${message}`
  
    var mail = {
      from: name,
      to: config.Recepiant,
      subject: "New message from contact form",
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  })




app.use(cors())
app.use(express.json())
app.use('/', router);
app.listen(3030)