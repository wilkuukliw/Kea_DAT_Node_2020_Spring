const express = require("express");
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(express.static('public'));
app.use(express.static('videos'));
app.use(express.static('addition'));

const fs = require('fs');   // file system module

// here: load the navbar and console.log it
const navbarPage = fs.readFileSync("public/navbar/navbar.html", "utf8"); //sync means the other thread will not start unless main not stop 
const footerPage = fs.readFileSync("public/footer/footer.html", "utf8");

const indexPage = fs.readFileSync("public/index/index.html", "utf8");
const playerPage = fs.readFileSync("public/player/player.html", "utf8");
const uploadPage = fs.readFileSync("public/upload/upload.html", "utf8");

app.get("/", (req, res) => {           //serving html, frontend 
   return res.send(navbarPage + indexPage + footerPage);
});

//server render code
app.get("/player/:videoid", (req, res) => {
    return res.send(navbarPage + playerPage + footerPage);
});

app.get("/upload", (req, res) => {
    return res.send(navbarPage + uploadPage + footerPage);
 });

 app.get("/svg", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/addition/svg.html");
});

// Import routes
const videosRoute = require("./routes/videos");

//Setup routes
app.use(videosRoute)

const port = process.env.PORT ? process.env.PORT : 3000;

const server = app.listen(port, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server is running on port", server.address().port);
});