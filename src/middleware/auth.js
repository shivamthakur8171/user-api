const jwt = require ("jsonwebtoken");
const user = require ('../models/model');


const auth = async ( req, res ,next) =>{
    try{

        const token = req.cookies.jwt;
        const verifytoken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifytoken);

        const userdetail = await user.findOne({_id:verifytoken._id});
        // console.log(userdetail); 
        req.token = token;
        req.userdetail = userdetail;

        next();

    }catch(err){
        res.status(401).send({
            msg :'please login first',
            err
        });
    }
}

module.exports = auth;