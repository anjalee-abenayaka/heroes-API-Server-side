const express = require("express");
const router = express.Router();

router.get("/", (req, res) => { //main router

    res.send("Avengers Assemble!");
  
});
  
module.exports = router;