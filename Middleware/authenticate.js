const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    let token=req.headers.authorization;
    console.log(token)
    if(token){
        jwt.verify(token,"shhh",(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send("Please Login first")
            }
        })
    }else{
        res.send("Please login first")
    }
}
module.exports={
    authenticate
}