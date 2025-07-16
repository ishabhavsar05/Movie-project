const mongoose = require('mongoose')
require('dotenv').config();

async function ConnectToDb(){
    const connectUser = await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected DB Successfully...!!!");
    
}

//userSchema

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//userModel
const userModel = new mongoose.model('User',userSchema)


module.exports = {ConnectToDb,userModel}