const user = require('../models/model');


const logout = async (req , res) =>{
    try{
        // console.log(req.userdetail);

        // logout single user
        // req.userdetail.tokens = req.userdetail.tokens.filter((currElement) =>{
        //     return currElement.token !== req.token
        // })

        // logout all users
        req.userdetail.tokens = [];

        res.clearCookie("jwt");
        // console.log("logout");
        await req.userdetail.save();
        res.status(201).send("you are logout successfully...")
    }catch(err){
        res.status(500).send(err);
    }
}

module.exports = logout;