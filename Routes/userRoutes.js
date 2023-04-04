const express=require("express");
const userRouter=express.Router();

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { UserModel } = require("../Models/userSchema");

userRouter.get("/",(req,res)=>{
    res.send("everything is working")
})

userRouter.post("/register",async(req,res)=>{
    let data=req.body;
    try {
        let count=await UserModel.find({email:data.email})
        if(!count.length){
            bcrypt.hash(data.password,4,async(err,hash)=>{
                if(hash){
                    let user =new UserModel({...data,password:hash})
                    await user.save()
                    console.log(user)
                    res.send({msg:"User is registerd with the following details",user})
                }else{
                    res.send(err)
                }
            })
        }else{
            res.send("User is already egisterd")
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


userRouter.post("/login",async(req,res)=>{
    let data=req.body;
    console.log(data)
    try {
        let user=await UserModel.find({email:data.email});
        if(user.length){
            console.log(user[0])
            bcrypt.compare(data.password,user[0].password,(error,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},"shhh");
                    let date=new Date();
                    date=date.toString()
                    res.send({msg:"User has been signed in successfully",token,date})
                }else{
                    res.send({msg:"Wrong Password",error:error})
                }
            })
        }else{
            res.send("Wrong credentials")
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    userRouter
}