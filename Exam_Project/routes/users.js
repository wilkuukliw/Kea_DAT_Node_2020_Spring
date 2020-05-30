
const router = require('express').Router();
const User = require('../models/User.js');


//todo: make session work 

router.get('/setsessionvalue', (req, res) => {
    req.session.myValue = req.sessionID; // take the value from the request and dynamically set it here
    return res.send({ });
});

router.get('/getsessionvalue', (req, res) => {
    return res.send({ response: req.session.myValue });
});

module.exports = router;