const express = require("express");
const app = express();   //in order to import, we save it to constant variable. and 'app' is a server. run npm i express and then it is added to package/dependencies

// parse application/json
app.use(express.json());
app.use(express.static('.'));
app.use(express.urlencoded({ extended: false }));

const session = require('express-session');  //keep track of users logged in and authorisation

app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecret,  //  used to determine if the user is logged-in
    resave: false,   //save to seession store?
    saveUninitialized: true
}));

// rate limiter
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,   //15 minutes
    max: 8  //limit each IP to 100 requests per windows
});

app.use("/login", limiter);
app.use("/singup", limiter);

// setup ojbection + knex
const { Model } = require('objection');  // used to create an extra abstraction layer to make objects with. built on an SQL query builder - knex
const Knex = require('knex');     // with capital cause this is a library
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);    // and this is a connection from the knexfile - in lower case

Model.knex(knex);  // build in method - objects now are aware of the connection 

// setup routes with our server instance
const authRoute = require('./routes/auth.js');    
const usersRoute = require('./routes/users.js');
const secretsRoute = require('./routes/secrets.js');

app.use(authRoute);
app.use(usersRoute);   // REST for the user model
app.use(secretsRoute);

// auth routes:
// endpoint - HTTP VERB
// signup - HTTP POST
// login - HTTP POST
// logout - HTTP GET

// start the server
const PORT = 3001;

app.listen(PORT, (error)=> {    
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", PORT)   
});