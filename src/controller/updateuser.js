const user = require('../models/model');

//update user data
const updateuser = async (req, res) => {
    try {
        const _id = req.params.id;
        const updateuser = await user.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(201).send(updateuser);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports= updateuser;