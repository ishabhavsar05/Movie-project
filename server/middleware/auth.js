const jwt = require('jsonwebtoken');
require('dotenv').config();

function CheackIsAuth(req,res,next){
    const {Access_Token} = req.cookies;

    if(!Access_Token){
        return res.status(400).json({message:"Unauthorized, Please Login First...!!!"})
    }

    const decoded = jwt.verify(Access_Token,process.env.JWT_SECRET);
    if(!decoded){
        return res.status(400).json({message:"Invalid Token...!!!"})
    }

    req.user=decoded
    next();
}

module.exports = CheackIsAuth