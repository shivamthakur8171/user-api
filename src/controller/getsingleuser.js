const user = require('../models/model');

// get single user data
const getuserbyid = async (req, res) => {
    try {
        // console.log(req.body)
        const _id = req.params.id;
        // console.log("hlo",_id)
        const getsingleuser = await user.findById(_id, req.body)
        res.status(201).send(getsingleuser);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = getuserbyid;