const nodemailer = require("nodemailer");
const user = require('../models/model');
const jwt = require("jsonwebtoken");
const forgetpassSchema = require('../models/forgotPassword');

const sendemail = async (req, res) => {

    const email = req.body.email;
    // console.log(email);
    const useremail = await user.findOne({email: email});
    // console.log(useremail)
    if(!useremail){
        res.status(400).send("user with this email does not exist")
    }
    //generate token 
    const forgetpasswordtoken = jwt.sign({ _id: useremail._id },process.env.FORGET_KEY,{expiresIn: "15 min"});
    // console.log(forgetpasswordtoken);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service:"gmail",
            host: "smtp.gmail.com",
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER, // generated ethereal user
                pass: process.env.PASSWORD // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"forget password mail" <monukashyaptest@gmail.com>', // sender address
            to: "monukashyaptest@gmail.com", // list of receivers
            subject: "password reset link ", // Subject line
            text: "plz change the password click on the below link ", // plain text body
            html:`
            <div>
                <h2> Hello ${useremail.name}</h2>
                <h4> this e mail is valid only 15 min</h4>
                <p> please change the password click on the below link</p>
                <a href='http://localhost:8000/user/forgetpassword/${forgetpasswordtoken}'>click here</a>
                <p>http://localhost:8000/user/forgetpassword/${forgetpasswordtoken}</p>
            </div>`

        });
        //  save data in db...
        const tokenDB =  forgetpassSchema({
            token:forgetpasswordtoken
        })
        await tokenDB.save();
        if(info.messageId){
            res.send("Link is sent to your Email Account plz check your email");
        }else{
            res.send("error with sending email");
        }
        // console.log("Message sent: %s", info.messageId);
        // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
}

module.exports = sendemail;