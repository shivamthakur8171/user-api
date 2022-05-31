const user = require('../models/model');


//get user data 
const getusers = async (req, res) => {
    // console.log(`this is the cookie ${req.cookies.jwt}`);
    // res.status(201).send("You are Authorised User");
    try {
        // console.log(req.userdetail.userrole)    //find current login details.....
        if(req.userdetail.userrole==="super-admin"){
            const getuser = await user.find();
            res.status(201).send(getuser);
        }else{
            res.status(201).send(req.userdetail);
        }
       
    } catch (err) {
        res.status(400).send(err);
    }
}


module.exports = getusers;