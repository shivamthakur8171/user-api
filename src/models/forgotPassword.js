const mongoose = require("mongoose");


// create a schema for user registration
const forgetpassSchema = new mongoose.Schema({
    token:{
        type : String,
        required: true,
    }
});


module.exports= mongoose.model("forgetpasstoken",forgetpassSchema);;