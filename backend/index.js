const express = require("express");
const app = express();
const port = 5000;
const mongoDB=require("./db");
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-with, Content-Type ,Accept"
  );
  next();
})

mongoDB();

// app.get("/",(req,res)=>{
//     res.send("hello world")
// })



// //Route implementation using middleware differnt request comes here it will give response//
app.use(express.json());
app.use("/api",require("./Routes/CreateUser"))
app.use("/api",require("./Routes/DisplayData"))
app.use("/api",require("./Routes/OrderData"))
app.listen(port,()=>{
    console.log(`Example app listen on port ${port}`);
})