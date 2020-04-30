const express = require("express");
const app = express();   //to import save it to constant variable. and 'app' is a server. first run npm i express and it is added to package/dependencies


// parse application/json
app.use(express.json());


// setup ojbection + knex

const { Model } = require('objection');
 const Knex = require('knex');     // with capital cause this isa library
 const knexFile = require('./knexfile.js');

 const knex = Knex(knexFile.development);    // and this is a connection from the knexfile with lower case

 Model.knex(knex);  // build in method, objects now are aware of the connection 

// add routes

const authRoute = require('./routes/auth.js');
app.use(authRoute);

// auth routes
// endpoit - HTTP VERB
// signup - HTTP POST
// login - HTTP POST
// logout - HTTP GET

// start server

const PORT = 3000;

app.listen(PORT, (error)=> {    
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", PORT)   
});
