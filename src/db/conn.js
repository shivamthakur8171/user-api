const mongoose = require ("mongoose");

mongoose.connect(process.env.DB).then(() => {
    console.log("connection is successful");
}).catch((err) => {
    console.log("No connection" , err);
})