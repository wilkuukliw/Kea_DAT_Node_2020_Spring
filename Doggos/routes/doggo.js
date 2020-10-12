const router = require('express').Router();
const path = require('path'); 
const Doggo = require('../models/Doggo.js');

router.get('/doggos', (req,res) => {
    return res.sendFile(path.join(__dirname, '../public/doggos/doggos.html'));
});

router.get('/doggos/collection', async (req,res) => {
    const doggos = await Doggo.query().select();
    return res.send({ response : doggos });
});


router.get('/doggos/:id', (req,res) => {
    return res.sendFile(path.join(__dirname, '../public/doggos/doggo.html'));
});

router.get('/doggo/collection/:id', async (req, res) => {
    try {
        const doggo = await Doggo.query().select('*').where('id', req.params.id); 
        
        if (doggo.length > 0 ) {
        return res.send({ response: doggo });
        } else {
            return res.status(400).send({ response: "Doggo with such an identifier does not exist in our database" });
        }
    } catch (error) {
        return res.status(500).send({ response: "Something went wrong with the database" + error});
    }
});

module.exports = router;


//These routing methods specify a callback function called when the application receives a request to the specified route (endpoint) and HTTP method. 
// In other words, the application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

//promise  - The Promise object is created using the new keyword and contains the promise; this is an executor function which has a resolve and a reject callback. 
//  A promise is useful when e.g. you deal with data that needs to load first.


// const weather = true
// const date    = new Promise(function(resolve, reject) {
//   if (weather) {
//     const dateDetails = {
//       name:     'Cubana Restaurant',
//       location: '55th Street',
//       table:    5
//     };

//     resolve(dateDetails)
//   } else {
//     reject(new Error('Bad weather, so no Date'))
//   }
// });