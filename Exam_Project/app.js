const express = require("express"); //web app framework
const app = express();

//todo:sockets
app.use(express.json());
app.use(express.static('.'));  //configure express to integrate stylesheets into the app
app.use(express.urlencoded({extended: false}));

const fs = require('fs');

const navbarPage = fs.readFileSync("public/navbar/navbar.html", "utf8");
const indexPage = fs.readFileSync("public/index/index.html", "utf8");
const footerPage = fs.readFileSync("public/footer/footer.html", "utf8");
const uploadPage = fs.readFileSync("public/upload/upload.html", "utf8");
const contactPage = fs.readFileSync("public/contact-form/sendMail.html", "utf8")

app.get("/", (req,res) => {
    return res.send(navbarPage + indexPage + footerPage);
});

app.get("/upload", (req,res) => {
    return res.send(navbarPage + uploadPage + footerPage);
});

app.get("/sendMail", (req,res) => {
    return res.send(navbarPage + contactPage + footerPage);
});

const authRoute = require('./routes/auth.js');
const uploadRoute = require('./routes/upload.js');
const contactRoute = require('./routes/contact.js');
app.use(authRoute); 
app.use(uploadRoute);
app.use(contactRoute);

// objection + knex

const { Model } = require('objection');  // used to create an extra abstraction layer to make objects with. built on an SQL query builder - knex
const Knex = require('knex');   //capital letter cause this is a library
const knexFile = require('./knexfile.js')

const knex = Knex(knexFile.development); // connection from knexfile

Model.knex(knex); // objects now aware of the connection. built in method. 


const PORT = 5002

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port ", PORT)
});









