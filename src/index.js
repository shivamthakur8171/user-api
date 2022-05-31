require('dotenv').config();
require("./db/conn");
const express = require("express");
const userrouter = require ("./routes/route");
const cookieParser = require('cookie-parser');

const port = process.env.PORT;
const app = express();

app.use(express.json());

// console.log(process.env.SECRET_KEY);
app.use(cookieParser());

app.use("/profile",express.static('upload/images'));
app.use('/user',userrouter);


app.listen(port, () =>{
    console.log(`connection is setup at port no ${port}`);
});