const router = require("express").Router();
const registercontroller = require ("../controller/registration");
const auth = require('../middleware/auth');
const logout = require("../controller/logout");
const login = require("../controller/login");
const getusers = require("../controller/getusers");
const updateuser = require("../controller/updateuser");
const getuserbyid = require("../controller/getsingleuser");
const deleteuser = require("../controller/deleteuser");
const upload = require("../controller/profile");
const path = require('path');
const sendemail = require('../controller/emailsend');
const forgetpassword = require ('../controller/forgetpassword');

router.post('/registration',registercontroller);

router.post("/login",login);
router.get("/logout",auth,logout);
router.get('/getusers',auth,getusers);
router.patch('/updateUser/:id',auth,updateuser);
router.get('/getUserById/:id',auth,getuserbyid);
router.delete('/deleteUser/:id',auth,deleteuser);

router.post('/sendemail',sendemail);
router.post('/forgetpassword/:forgettoken',forgetpassword);

router.post("/uploads",auth,upload.single('profile'), (req,res) =>{
    // console.log(__dirname);
    const img_path = path.join(__dirname, `../../upload/images/${req.file.filename}`)
    console.log(img_path);
    res.json({
        success: 1, 
        profile_url: img_path
    })
})

module.exports=router;
