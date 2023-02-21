const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const blog = require("./routes/blog");
//creating app
const app = express();
//
dotenv.config();
//
app.use(express.json());
//
mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("Connected to Mongo Database"))
    .catch((err) => {console.log("Error",err)});

app.use("/blog", blog)
app.get("/",(req,res)=>{
    console.log("Hey");
    res.send("Hey")
})
//listening to port 3000
app.listen(3000, () => console.log('Server running......'));
