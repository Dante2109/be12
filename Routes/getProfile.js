const express=require("express");
const { UserModel } = require("../Models/userSchema");

const getProfile=express.Router();

getProfile.get("/",async(req,res)=>{
    try {
        let user=await UserModel.find({_id:req.body.user})
        console.log(user)
        res.send({email:user[0].email,name:user[0].name,date:req.body.date})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


module.exports={
    getProfile
}