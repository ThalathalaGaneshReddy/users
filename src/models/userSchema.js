const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:String,
    phone:Number
})

mongoose.model("users",userSchema)
module.exports = mongoose.model("users")