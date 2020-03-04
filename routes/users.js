const express = require("express");
const router = express.Router();

const User = require("../models/user"); //imported user model

router.post("/", async(req, res) =>{

    //create user and save to db
  let userToBeCreated =  new User({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    });

    //call mongo operation to do this

 await userToBeCreated.save();
 return res.send({
     username : userToBeCreated.username,
     email : userToBeCreated.email // in here we are not sending password
 });
});
  
module.exports = router;