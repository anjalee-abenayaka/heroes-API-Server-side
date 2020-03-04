const mongoose = require("mongoose");

//user svhema
 const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email :{
        type: String,
        unique: true
    },
    password :{
        type : String,
        required: true
    }
 })

 //create model

 const User = mongoose.model("User", userSchema);
 module.exports = User;