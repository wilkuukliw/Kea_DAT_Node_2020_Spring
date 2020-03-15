const app = require("express")();   //to import. and 'app' is a server


app.get("/", (req, res) => {   //or function(req,res) without arrow

res.send({message: "Hello there"});    //to make get request

});   

//define smthing on the path aboutMe that returns a JSON representation of you

app.get("/aboutMe", (req, res) => {   //add aboutMe to the request
    const me = {
        name: "Anna",
        age: "29"
    };

    res.send(me);
});


//define something on the path /aboutThisWebsite that that returns a JSON representation of the webside

app.get("/aboutThisWebsite", (req, res) => {  
    const website = {
      name: "My new website",
       purpose: "JSON training"
    };
   if (website) {
        res.send(website);  //i like return statement, there should be no more code after vause it will not run
    }  
    res.send("Sorry, no info about this website.")
    //this here with not run
});

const weekdays =["Sunday"]    // outside rest api because only initialized once

//app.get("/time", (req,res) => {
   // cons date = new Date();

   // return res.send ({
     //   date: date.toLocalTimeString(),
     //   day: date.getHours(),
      //  weekday: date.detDay()
 
//});

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
                "Thursday", "Friday", "Saturday"];

app.get("/time", (req, res) => {
    const date = new Date();
    res.send({ 
        unformatedTime: date,
        time: date.toString(),
        day: date.getDay(),
        weekDay: days[date.getDay()]
    });
});

app.get("/user/:id", (req,res) => {  //dynamic variables defined after collon
    console.log(req.params);
    return res.send({ 
        id: req.params.id});
});


app.get("/search", (req,res) => {
    return res.send(req.query);

});


app.get("/google", (req,res)  =>{

    const request = require('request');   //importing
    request('http;//www.google.com', (error,response,body) =>{
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode)  //print the response
    console.log('body:', body) //print the HTML for the google homepage
    return res.send(body);


});
});

app.get("/documentation", (req,res) => { 
    console.log(__dirname);   //global variable, it knows the directory
    //return res.redirect("/documentation2");
    return res.sendFile(__dirname + '/public/documentation.html');
});

app.get("/documentationtwo", (req,res) => { 
    console.log(__dirname);  
    return res.sendFile(__dirname + '/public/documentationtwo.html');

});

    app.listen(3000, error => {
        if (error) {
            console.log("Error running the server", error);
        }
        console.log("Server is running on port", 3000);
    });


    const server = app.listen(3000, (error) => {
        if (error) {
            console.log("Error running the server");
        }
        console.log("Server is running on port", server.address().port);
    });