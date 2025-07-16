const mongoose = require('mongoose');
require('dotenv').config();

async function ConnectDb(){
    const connectMovie = await mongoose.connect(process.env.MONGO_URL)
    console.log('connectDB successfully');
    
}




module.exports=ConnectDb