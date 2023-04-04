const express=require("express");
const cors=require("cors");
require("dotenv").config();
const { connection } = require("./Configs/db");
const { userRouter } = require("./Routes/userRoutes");
const { authenticate } = require("./Middleware/authenticate");
const { getProfile } = require("./Routes/getProfile");
const { calculator } = require("./Routes/calculator");


const server=express();

server.use(cors())
server.use(express.json())
server.use("/users",userRouter)
server.use(authenticate)
server.use("/getProfile",getProfile)
server.use("/calculator",calculator)

server.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Database has been connected")
    } catch (error) {
        console.log(error)
    }
    console.log("Server has been connected")
})