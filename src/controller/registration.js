const user = require('../models/model');

// create user data

const registercontroller = async (req, res) => {
    try {
        //   console.log(req.body);

        // password and confirm password match;
        if (req.body.password === req.body.confirmpassword) {

            // password validation using regex;
            const passwordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;
            const passwordvalcheck = passwordValidate.test(req.body.password);
            // console.log(passwordvalcheck);
            if (!passwordvalcheck) {
                return res.status(400).json("please enter strong password");
            }
            const userdata = new user(req.body);
            // console.log("the success part",userdata);

            // const token = await userdata.generateAuthToken(); // generating token code.
            // console.log("the token part ", token);

            const createuser = await userdata.save();
            res.status(201).send(createuser);
        }else{
            res.status(500).send("password and confirm password is not match")
        }
    } catch (e) { res.status(400).send(e); }
}

module.exports = registercontroller;