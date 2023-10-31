const mongoose = require('mongoose');

// require("dotenv").config();                                                   
// const ConnectionString = process.env.CONNECTION_STRING; 


mongoose.connect("mongodb+srv://ashikmohan3992:ashik12345@cluster0.mxzfvgx.mongodb.net/")
.then(()=>{
    console.log(`MongoDb connected`);
})
.catch((error)=>{
    console.log(`Error in connecting to database ${error.message}`);
})