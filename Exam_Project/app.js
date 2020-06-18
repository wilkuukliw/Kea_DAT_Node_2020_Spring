const express = require("express"); 
const app = express();
const helmet = require('helmet');
const escape = require('escape-html'); 
const fs = require('fs'); 
const session = require('express-session');  

//app.use(express.json());  //built in method to recognize the incoming Request Object as a JSON Object. retaed to POST request
app.use(express.static('.'));
app.use(express.urlencoded({extended: true})); 
app.use(helmet()); 

app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecret,  
    resave: false,  
    saveUninitialized: true
}));

const navbarPage = fs.readFileSync("public/navbar/navbar.html", "utf8");  
const indexPage = fs.readFileSync("public/index/index.html", "utf8");   
const footerPage = fs.readFileSync("public/footer/footer.html", "utf8");
const imagesPage = fs.readFileSync("public/images/images.html", "utf8");   
const contactPage = fs.readFileSync("public/contact-form/sendMail.html", "utf8");
const uploadPage = fs.readFileSync("public/upload/upload.html", "utf8");
const chatPage = fs.readFileSync("public/chat/chat.html", "utf8");
const weatherPage = fs.readFileSync("public/weather-api/weather.html", "utf8")

app.get("/", (req,res) => {
    return res.send(navbarPage + indexPage + footerPage);    // browser renders html pages and send them to the client
});

app.get("/upload", (req,res) => {
    if(req.session.user) {
        return res.send(navbarPage + uploadPage + footerPage); 
    } else {
        return res.redirect('/login');
    }
});

app.get("/sendMail", (req,res) => {
    if(req.session.user) {
        return res.send(navbarPage + contactPage + footerPage);
    } else {
        return res.redirect('/login');
    }
});

app.get("/images", (req,res) => {
    if(req.session.user) {
        return res.send(navbarPage + imagesPage + footerPage);
    } else {
        return res.redirect('/login');
    }
 });

app.get("/chat", (req,res) => {
    return res.send(chatPage);
});

app.get("/weather", (req,res) => {
    return res.send(weatherPage);
});

const authRoute = require('./routes/auth.js');        
const uploadRoute = require('./routes/upload.js');
const contactRoute = require('./routes/contact.js');
const usersRoute = require('./routes/users.js');

app.use(authRoute); 
app.use(uploadRoute);   
app.use(contactRoute);
app.use(usersRoute);   // REST for the user model /transferring  representations of a resource(user json object) to transfer its state from server/lives there/ to client 

// objection + knex

const { Model } = require('objection'); 
const Knex = require('knex');   
const knexFile = require('./knexfile.js')

const knex = Knex(knexFile.development); // connection from knexfile
Model.knex(knex); // objects now aware of the connection. built in method. 

// socket

const server = require('http').createServer(app);  // create server
const io = require('socket.io')(server);  // pass server to io library

io.on('connection', socket => {    //initialize connection, this callback contains info about specific client
    console.log("Socket joined", socket.id);


   socket.on("Hi!", ({ talk }) => {
       
         io.emit("User said", { talk: escape(talk) });  // sends out to all the clients

        }); 

         socket.on('disconnect', () => {      
         console.log("Socket left", socket.id);
    });
});


const port = process.env.PORT ? process.env.PORT : 5002;  

server.listen(port, (error) => {
    if(error) {
        console.log("Error running the server", error);
    }
    console.log("Server is running on port ", server.address().port)
});