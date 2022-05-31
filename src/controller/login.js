const user = require('../models/model');
const bcrypt = require("bcrypt");


const login = async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;
        // console.log(pass , email)
        const useremail = await user.findOne({ email: email });
        //  ........user already login ........
        if (req.cookies.jwt) {
            res.send("you are already login");
        }
        // res.send(useremail);
        if (!useremail) {
            res.status(400).send("email is not match or incorrect e mail")
        }
        // console.log("helooo",useremail);

        // bcrypt password matching
        const isMatch = await bcrypt.compare(pass, useremail.password);
        // console.log("helooo2");

        if (isMatch) {
            const token = await useremail.generateAuthToken(); // generating token code.
            // console.log("the token part ", token);

            // expire token
            res.cookie("jwt", token);
             // console.log(`this is the cookie ${req.cookies.jwt}`);
             
            res.status(201).send({
                msg: "you are successfully login!",
                token
            });
        } else {
            res.send("Invalid password");  //invalid password
        }
    } catch (err) {
        res.status(400).send({
            msg: "invalid user name and password",
            err
        });
    }
}

module.exports = login;