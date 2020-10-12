const express = require('express');
const app = express();
const helmet = require('helmet');
const escape = require('escape-html');
app.use(express.static('public'))
app.use(express.static('.'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(helmet()); 
const session = require('express-session'); 
 

app.use(session({
    secret: require('./config/mysqlCred.js').sessionSecret,  
    resave: false,  
    saveUninitialized: true
}));

app.get("/", (req,res) => {
    return res.sendFile(__dirname + "/public/index/index.html")
});

app.get("/chat", (req,res) => {
    return res.sendFile(__dirname + "/public/chat/chat.html")
});

app.get("/breeds", (req,res) => {
    return res.sendFile(__dirname + "/public/breeds/breeds-api.html")
});

app.get("/about", (req,res) =>{
    return res.sendFile(__dirname + "/public/about.html")
});

/* knex and objection */

const { Model } = require('objection'); 
const Knex = require('knex');    
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);   

Model.knex(knex);  

/* sockets */ 

const server = require('http').createServer(app);   

const io = require('socket.io')(server);  // pass server to io library

io.on('connection', socket => {    // initialize connection, this callback contains info about specific client

   socket.on("Listen to the client!", ({ talk }) => {
       
         io.emit("User said", { talk: escape(talk) }); 

        }); 
});

const applicationRoute = require("./routes/application.js");    
app.use(applicationRoute);   
const doggoRoute = require("./routes/doggo.js");    
app.use(doggoRoute);   
const authRoute = require('./routes/auth.js');   
app.use(authRoute);
const addRoute = require('./routes/add-dog.js');   
app.use(addRoute);


const port = process.env.PORT ? process.env.PORT : 3000;

server.listen(port, (error) => {
    if (error) {
        console.log("Error running the server", error);
    }
    console.log("Server is running on port", server.address().port)

});