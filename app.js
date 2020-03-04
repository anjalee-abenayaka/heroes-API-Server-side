const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();
const authentication = require("./middleware/authenticator");
const emailjob = require("./middleware/emailsender");

const heroes = require("./routes/heroes"); //import file
const home = require("./routes/home");
const users = require("./routes/users");
const auth = require("./routes/auth");
app.use(cors());
app.use(express.json()); //middle wear - we cannot see the 

/*app.use((req, res, next) =>{
  console.log("Middleware function...");
  next();
  });*/
app.use(authentication);
//create own middleware
//next used for passed to next middle ware
app.use(emailjob);
//its runing under the order of this app call
//will runing on the server what ever the request it is
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/heroes",heroes); // custom middle ware. starting from this, its' automatically go to heroes routes
app.use("/",home); //
//const PORT = 5000;
const PORT = process.env.PORT;
mongoose.connect("mongodb+srv://anjalee:12345@cluster0-edfz9.mongodb.net/herodb?retryWrites=true&w=majority",{
  useNewUrlParser: true })
  .then(() => console.log("Connected to the db successfully"))
  .catch(ex => console.log(ex));


app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
  //server starting port
