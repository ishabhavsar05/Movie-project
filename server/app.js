const express = require('express');
const { ConnectToDb } = require('./models/user.model');
require('dotenv').config();
const cors = require('cors')
userRoutes = require('./routes/user.route')
const app = express();


app.use(express.json());
app.use(cors())
app.use('/api/user',userRoutes)



app.listen(process.env.PORT,async()=>{
    try {
        await ConnectToDb();
        console.log(`server is running port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
        
    }
    
})