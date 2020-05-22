const router = require('express').Router();
const path = require('path');
const nodemailer = require('nodemailer');
const credentials = require("../config/emailCredentials");

const User = require('../models/User.js');

router.get("/", (req, res) => {
    if(req.session.user) {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    } else {
        return res.redirect('/login');
    }
});

router.get("/projects", (req, res) => {
    if(req.session.user) {
        return res.sendFile(path.join(__dirname, '../public/projects/projects.html'));
    } else {
        return res.redirect('/login');
    }
});

router.get("/secret", (req, res) => {
    if(req.session.user) {
        return res.sendFile(path.join(__dirname, '../public/secret.html'));
    } else {
        return res.redirect('/login');
    }
});

router.get("/partners", (req, res) => {
    if(req.session.user) {
        return res.sendFile(path.join(__dirname, '../public/partners.html'));
    } else {
        return res.redirect('/login');
    }
});

router.get("/sendMail", (req, res) => {
    if(req.session.user) {
        return res.sendFile(path.join(__dirname, '../public/sendMail.html'));
    } else {
        return res.redirect('/login')
    }
});

router.post("/sendMail", async (req, res) => {

    const {text} = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
        type: 'OAuth2',
        user: credentials.user,
        clientId: credentials.clientId,
        clientSecret: credentials.clientSecret,
        refreshToken: credentials.refreshToken
        }
    });
        
        let mailOptions = {
            to: 'anna.maria.wilczek@gmail.com',
            subject: "Request from my page",
            text: text
        };
        
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
             return console.log(error.message);
          }
          return res.send({response : 'E-mail has been sent'})
        }); 
    });

module.exports = router;