const route = require("express").Router();
const User = require('../models/User.js');



route.post("/login", (req, res) => {   

    res.send({message: "Hello there"});    //to make get request
    
    });   

route.post("/signup", async (req, res) => {   // async-await
    // const users = await User.query().select();

    //username, password, repeat password
    const { username, password, passwordRepeat } = req.body;

    const isPasswordTheSame = password == passwordRepeat;

    if (username && password && isPasswordTheSame) {
        // password requirements
        if (password.length < 8) {
            return res.status(400).send({ response: "Password does not fulfill the requirements" });
        } else {
            try {
                
            const userFound = await User.query().select().where({ 'username': username }).limit(1);
            if (userFound.length > 0) {
                return res.status(400).send({ response: "User already exists" });
            } else {

                // todo implement the Role model
                // await Role.query().select().where({ 'role': 'USER' });
                const createdUser = await User.query().insert({
                    username,
                    password,
                    roleId: 2
                });
                return res.send({ response: `User has been created with the username ${createdUser.username}` });
            }

            } catch (error) {
                return res.status(500).send({ response: "Something went wrong with the database" });
            }
        }

    } else if (password && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({ response: "Passwords do not match. Fields: password and passwordRepeat" });
    } else {
        return res.status(404).send({ response: "Missing fields: username, password, passwordRepeat" });
    }
    
});

route.post("/logout", (req, res) => {   

    res.send({message: "Hello there"});   
        
    });   

module.exports = route;