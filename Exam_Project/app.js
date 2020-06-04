const express = require("express"); // to instantiate express - web app framework - loaded/imported the module into its own variable which you could then use everywhere else in that module. express is back-end. helps to load html
const app = express();
const server = require('http').createServer(app);  //socket
const io = require('socket.io')(server);  //socket
const helmet = require('helmet');
const fs = require('fs'); // used to read the file and return its content.
const session = require('express-session');  //keep track of users logged in and authorisation

global.__basedir = __dirname;  // neded for upload route

app.use(express.json());
app.use(express.static('.'));  //configure express to integrate stylesheets into the app
app.use(express.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(helmet());  //helps you secure your Express apps by setting various HTTP headers

app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecret,  //  used to determine if the user is logged-in
    resave: false,   //save to seession store?
    saveUninitialized: true
}));

const navbarPage = fs.readFileSync("public/navbar/navbar.html", "utf8");  // can read files in a synchronous way, i.e. we are telling node.js to block other parallel process and do the current file reading process.
const indexPage = fs.readFileSync("public/index/index.html", "utf8");   // Client-side rendering allows developers to make their websites entirely rendered in the browser with JavaScript
const footerPage = fs.readFileSync("public/footer/footer.html", "utf8");   // In server-side rendering when a user makes a request to a webpage, the server prepares an HTML page by fetching user-specific data and sends it to the user’s machine over the internet. The browser then construes the content and displays the page.
const imagesPage = fs.readFileSync("public/images/images.html", "utf8");   // With client-side rendering, the initial page load is naturally a bit slow. However, after that, every subsequent page load is very fast. In most cases, requires an external library.
const uploadPage = fs.readFileSync("public/upload/upload.html", "utf8");
const contactPage = fs.readFileSync("public/contact-form/sendMail.html", "utf8");
const chatPage = fs.readFileSync("public/chat/chat.html", "utf8");
const weatherPage = fs.readFileSync("public/weather-api/weather.html", "utf8")

app.get("/", (req,res) => {
    return res.send(navbarPage + indexPage + footerPage);    //client side rendering 
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
app.use(usersRoute);   // REST for the user model

// objection + knex

const { Model } = require('objection');  // used to create an extra abstraction layer to make objects with. built on an SQL query builder - knex
const Knex = require('knex');   //capital letter cause this is a library
const knexFile = require('./knexfile.js')

const knex = Knex(knexFile.development); // connection from knexfile
Model.knex(knex); // objects now aware of the connection. built in method. 

// socket

io.on('connection', socket => { 
    console.log("Socket joined", socket.id);


   socket.on("I'm thinking about this", ({ talk }) => {
       // sends out to all the clients
         io.emit("Someone said", { talk });

        }); 

         socket.on('disconnect', () => {
         console.log("Socket left", socket.id);
    });
});


const PORT = 5002

server.listen(PORT, (error) => {
    if(error) {
        console.log("Error running the server", error);
    }
    console.log("Server is running on port ", PORT)
});