const mongoose = require("mongoose");
const validator =require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create a schema for user registration
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
        minlength : 3
    },
    userrole:{
        type : String,
        required : true,
        minlength : 5
    },
    email:{
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password :{
        type : String,
        required : true,
        
    },
    confirmpassword : {
        type : String,
        required : true,
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }],
});

// generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        // console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY ,{expiresIn: '24h'} );
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        // console.log(token);
        return token;
    }catch(err){
        res.send("the error part" + err);
    }
}

//bcrypt password or convert password into hash
userSchema.pre('save',async function(next){

    if(this.isModified("password")){
        // console.log(`the current password is ${this.password}`);
        this.password =await bcrypt.hash(this.password, 10);
        // console.log(`the current passoword is ${this.password}`);

        // conform passsword is undefined
        this.confirmpassword = await bcrypt.hash(this.password, 10);
        }
    next();
})

// create a collection using Models

const user = new mongoose.model("UserRegistration",userSchema);

module.exports= user;