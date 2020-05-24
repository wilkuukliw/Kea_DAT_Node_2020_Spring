const express = require("express"); //web app framework
const app = express();

//todo:sockets

app.use(express.static('.'));  //configure express to integrate stylesheets into the app
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const fs = require('fs');

const navbarPage = fs.readFileSync("public/navbar/navbar.html", "utf8");
const indexPage = fs.readFileSync("public/index/index.html", "utf8");
const footerPage = fs.readFileSync("public/footer/footer.html", "utf8");
const uploadPage = fs.readFileSync("public/upload/upload.html", "utf8");

app.get("/", (req,res) => {
    return res.send(navbarPage + indexPage + uploadPage + footerPage);
});


const authRoute = require('./routes/auth.js');
const uploadRoute = require('./routes/upload.js');
app.use(authRoute, uploadRoute);   // not sure if can all in one goal 


const PORT = 5000

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port ", PORT)
});







