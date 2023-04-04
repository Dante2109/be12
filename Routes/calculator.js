const express=require("express");
const calculator=express.Router();

calculator.post("/",async(req,res)=>{
    const {years,roi,investment}=req.body;
    let MV=investment*(
        (((1+(+roi/100))**years)-1)/(roi/100)
    )
    let IA=investment*years;
    let IG=MV-IA;
    IG=IG.toFixed(0)
    MV=MV.toFixed(0);
    IA=IA.toFixed(0)
    res.send({MV,IA,IG})

})
module.exports={
    calculator
}