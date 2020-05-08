const route = require("express").Router();
const User = require('../models/User.js');
const Role = require('../models/Role.js');

const bcrypt = require('bcrypt'); // blowish crypter :) to encrypt password
const saltRounds = 12;  // not sure what is that



route.post("/login", (req, res) => {   
    // 1. retrieve the login details and validate
    // 2. check for a user match in the database
    // 3. bcrypt compare
    // 4. sessions

    bcrypt.compare("plaintextPassword", "hashedPasswordToCompareWith").then((result) => {   //plaintext password comes from login form 
        console.log(result);
    });

    return res.send({response: "Hello there"});    //to make get request
    
    });   

route.post("/signup", async (req, res) => {   // async-await
    // const users = await User.query().select();

    // fields required: username, password, repeat password
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

                // todo implement the Role model using await instead
                const defaultUserRoles =  await Role.query().select().where({ 'role': 'USER' });

                const hashedPassword = await bcrypt.hash(password, saltRounds);
                
                const createdUser = await User.query().insert({

                    username,
                    password: hashedPassword,
                    roleId: defaultUserRoles[0].id
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

   // todo: destroy the session
    return res.send({message: "Hello there"});   
        
    });   

module.exports = route;