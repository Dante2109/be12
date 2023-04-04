const mongoose=require("mongoose")
require("dotenv").config()
const connection =mongoose.connect(process.env.MONGODBurl);
module.exports={
    connection
}