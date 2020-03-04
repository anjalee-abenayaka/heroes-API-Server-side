const express = require("express");
const router = express.Router();
const  jwt = require("jsonwebtoken")

const User = require("../models/user"); //imported user model
 const SECRET_KEY = "12345678" ;

router.post("/", async(req, res) =>{
//compare passwords and see if person authenticated
 let user = await User.findOne({ email: req.body.email});
 if (!user) {
     return res.status(400).send("Invalid Login Credentials");
}
let isPwValid = user.password === req.body.password
if (!isPwValid){
    return res.status("400").send("Invalid Login Credentials");
}

let token = jwt.sign({is: user._id, email: user.email}, SECRET_KEY);
res.send({
    token: token
});
});
  
module.exports = router;