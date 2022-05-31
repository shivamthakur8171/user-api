const user = require('../models/model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const forgetpassSchema = require('../models/forgotPassword');



const forgetpassword = async (req, res) => {
    try {
        const forgetpassDB = await forgetpassSchema.findOne({ token: req.params.forgettoken })
        // console.log(forgetpassDB);
        if (!forgetpassDB) {
            return res.status(400).json("password is already change plz resend the link ")
        }
        // console.log(forgetpassDB.count);
        const forgetpasswordtoken = req.params.forgettoken;
        // console.log(forgetpasswordtoken);
        const verifytoken = jwt.verify(forgetpasswordtoken, process.env.FORGET_KEY);
        // console.log('hlio',verifytoken);

        const userdetail = await user.findOne({ _id: verifytoken._id });
        // console.log(userdetail);

        //  passsword and confirm password is not match......
        if (req.body.password === req.body.confirmpassword) {

            // password validation using regex;
            const passwordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/;
            const passwordvalcheck = passwordValidate.test(req.body.password);

            // console.log(passwordvalcheck);
            if (!passwordvalcheck) {
                return res.status(400).json("please enter strong password");
            }

            //bcrypt password 
            const bycyptpassword = await bcrypt.hash(req.body.password, 10);
            const bycyptconfirmpassword = await bcrypt.hash(req.body.confirmpassword, 10);
            // console.log(bycyptpassword); 

            // change password and confirm password change ....
            const updatepassowrd = await user.updateOne({ _id: verifytoken._id }, { $set: { password: bycyptpassword, confirmpassword: bycyptconfirmpassword } });
            const deletetoken = await forgetpassSchema.deleteOne({ token: req.params.forgettoken })
            console.log(deletetoken)
            res.status(201).send("password change successsfully please login again")
        } else {
            res.json("password and confirm password is not match");
        }

    } catch (err) {
        res.status(400).send({
            msg: "plz resend the link the link is expire",
            err
        });
    }

}


module.exports = forgetpassword;