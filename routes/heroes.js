const express = require("express");
const router = express.Router(); 
const  jwt = require("jsonwebtoken");
const SECRET_KEY = "12345678" ;
// express wiil not work then need to add express.router
const Hero = require("../models/hero");


/*var heroesArray = [
    {
      id: 1,
      name: "Ranjan",
      superPowers: ["power1", "power2"],
      likeCount: 100
    },
    {
      id: 2,
      name: "Aravinda",
      superPowers: ["liquorPower", "disappearance"],
      likeCount: 900
    },
    {
      id: 3,
      name: "Nisal",
      superPowers: ["TikTok", "blackmail"],
      likeCount: 1200
    },
    {
      id: 4,
      name: "Kemila",
      superPowers: ["Docker", "Girls"],
      likeCount: 1200
    }
  ];
*/
router.get("/", async(req, res) => {
  try{
  let heros= await Hero.find() //find({ name: /^Ne/})  and find({ deceased : false })
                      //  .sort({name: "asc"})
                      //  .limit(4)
                      //  .select({ name: 1, deceased:1 })
                        
    res.send(heros);
  } catch(ex){
    return res.status(500).send(ex.message);
  }
  });
  
  router.get("/:heroId", async(req, res) => {
   // let userRquestedId = parseInt(req.params.heroId);
   let requestedHero = await Hero.find({ _id:req.params.heroId})
   // let requestedHero = heroesArray.find(h => h.id === userRquestedId);
   // Same as Hero.findById(req.params.heroId)
    if (!requestedHero) {
      return res.status(404).send("Requested Id does not exist on our server");
    }
  
    return res.status(200).send(requestedHero);
  });
  

 router.post("/",async (req,res) =>{
     /* if (!req.body.name){
          return res.status(400).send("Please check request again");
      }*/
      /* let newHero = {
          id: heroesArray.length + 1,
          name:req.body.name,
          superPowers: req.body.superPowers,
          likeCount: req.body.likeCount
      };*/
     // heroesArray.push(newHero);
     
      //res.send(newHero);

      // check token in request header and see if the token is valid or not

      const token = req.header("x-jwt-token");
      if (!token){
        return res.status(401).send("Access denied");
      }
     try{ 
       jwt.verify(token, SECRET_KEY);
      }  catch(e)
      {
res.status(400).send("Invalid token");
      }

  try{      
let heroToAdd = new Hero({
name : req.body.name,
birthname : req.body.birthname,
superPowers : req.body.superPowers,
likeCount : req.body.likeCount,
deceased : req.body.deceased,
movies : req.body.movies,
imgUrl : req.body.imgUrl

  });

  heroToAdd = await heroToAdd.save();
  res.send(heroToAdd);
  }catch(ex){
    return res.status(500).send(ex.message);
  }
  });
  

  router.put("/:heroId", async(req, res) => {
 // let requestIdToEdit = parseInt(req.params.heroId);
  if(!req.body.likeCount){
      return res.status(400).send("Request does not contain all values");
  }
  //let heroToEdit = heroesArray.find(h => h.id == requestIdToEdit);
  //First call findById to find the object from the db

 let heroToEdit = await Hero.findById(req.params.heroId);
  heroToEdit.set({likeCount : req.body.likeCount});
  heroToEdit = await heroToEdit.save();

  if (!heroToEdit){
      return res.status(404).send("Give Id does not exist");
  }
  heroToEdit.likeCount = req.body.likeCount;
  res.send(heroToEdit);
  });
  
  router.delete("/:heroId", async(req,res) => {
 // let heroToDelete = heroesArray.find(h => h.id == parseInt(req.params.heroId));
 let heroToDelete = await Hero.findOneAndDelete({ _id:req.params.heroId})
  if (!heroToDelete){
      return res.status(404).send("Give Id does not exists");
  }
  
  let indexOfHero = heroesArray.indexOf(heroToDelete);
  heroesArray.splice(indexOfHero, 1);
  res.send(heroToDelete);
  });
  
  module.exports = router; //export router out