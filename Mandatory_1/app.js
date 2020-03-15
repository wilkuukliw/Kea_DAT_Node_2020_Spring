const express = require("express");
const app = express();

app.use(express.static('public'));
app.use(express.static('snippets'));

app.get("/",(req,res) => {
    return res.send({about: "This is my documentation API version 0.0.1, Anna Maria Wilczek"})
});

app.get("/index", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/about.html");
});

app.get("/facts", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/facts.html");
});

app.get("/functions", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/functions.html");
});

app.get("/tools", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/tools.html");
});

app.get("/objects", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/objects.html");
});

app.get("/nodemon", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/nodemon.html");
});

app.get("/express", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/express.html");
});

app.get("/npm", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/npm.html");
});

app.get("/github", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/github.html");
});

app.get("/httprequests", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/httprequests.html");
});

app.get("/jquery", (req,res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/jquery.html");
});

app.listen(3000, (error) => {
    if (error) {
        console.log("Error running the server");
    }
    console.log("Server running on port 3000");
});
