const user = require('../models/model');

// // delete user
const deleteuser = async (req, res) => {
    try {
        const deleteuser = await user.findByIdAndDelete(req.params.id);
        // console.log(deleteuser);
        if (!req.params.id) {
            return res.status(404).send();
        } else {
            res.send("the user is deleted successfully");
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = deleteuser;