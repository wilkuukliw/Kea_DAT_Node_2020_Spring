const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const escape = require('escape-html');
app.use(express.static('public'))
app.use(express.static('.'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(helmet()); 


app.get("/", (req,res) => {
    return res.sendFile(__dirname + "/public/index/index.html")
});

app.get("/chat", (req,res) => {
    return res.sendFile(__dirname + "/public/chat/chat.html")
});

app.get("/breeds", (req,res) => {
    return res.sendFile(__dirname + "/public/breeds/breeds-api.html")
});

/* knex and objection */

const { Model } = require('objection');  // used to create an extra abstraction layer to make objects with. built on an SQL query builder - knex
const Knex = require('knex');     // with capital cause this is a library
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);    // and this is a connection from the knexfile - in lower case

Model.knex(knex);  // build in method - objects now are aware of the connection 

/* sockets */ 

const server = require('http').createServer(app);   // creating an HTTP server yourself, instead of having Express create one for you is useful if you want to reuse the HTTP server, for example to run socket.io within the same HTTP server instance

const io = require('socket.io')(server);  // pass server to io library

io.on('connection', socket => {    //initialize connection, this callback contains info about specific client

   socket.on("Listen to the client!", ({ talk }) => {
       
         io.emit("User said", { talk: escape(talk) });  // sends out to all the clients

        }); 
});


// setup route with our server instance
const applicationRoute = require("./routes/application.js");    
app.use(applicationRoute);   // REST for the application model

const doggoRoute = require("./routes/doggo.js");    
app.use(doggoRoute);   // REST for the doggo model


const port = process.env.PORT ? process.env.PORT : 8888;

server.listen(port, (error) => {
    if (error) {
        console.log("Error running the server", error);
    }
    console.log("Server is running on port", server.address().port)

});