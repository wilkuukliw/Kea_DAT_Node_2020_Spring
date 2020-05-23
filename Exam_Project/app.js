const express = require("express"); //web app framework
const app = express();

app.use(express.static('.'));  //configure express to integrate stylesheets into the app
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const authRoute = require('./routes/auth.js');
app.use(authRoute);

const PORT = 5000

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port ", PORT)
});







