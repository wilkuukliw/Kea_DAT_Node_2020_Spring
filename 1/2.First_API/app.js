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

app.listen(3000, (error)=> {    //one argument can be without parenthesess, 
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port 3000")   // or port", 3000)
});

//define something on the path /aboutThisWebsite that that returns a JSON representation of the webside

app.get("/aboutThisWebsite", (req, res) => {  
    const website = {
        name: "My new website",
        purpose: "JSON training"
    };
    if (website) {
        res.send(website);  //i like return statement, there shpuld be no more code after vause it will not run
    }  
    res.send("Sorry, no info about this website.")
    //this here with not run
});

