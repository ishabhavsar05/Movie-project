const { userModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports.test = (req, res) => {
    res.send("test api is working");
}

module.exports.register = async (req, res) => {
    //find if req.body is empty or not?
    if (!req?.body) {
        res.status(400).json({ message: "Requset body is Required...!!!" })
    }

    //Check if all fields are present
    const { name, email, password } = req?.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields is required" })
    }


    try {

        // cheack if user already exist (email cheack)
        const isExistUser = await userModel.findOne({ email })

        if (isExistUser) {
            return res.status(400).json({ message: "user is aleady exist...!!!" })
        }

        //hash-password
        const hashPassword = await bcrypt.hash(password, 5)

        //create new user
        await userModel.create({ ...req.body, password: hashPassword })
        res.status(200).json({ message: "user register successfully" })



    } catch (error) {
        console.log("Error during registration...!!!", error);

        res.status(400).json({ message: "internal server error...!!!" || error.message })
    }

}

module.exports.login = async (req,res) => {
    //cheack req.body is exist
    if(!req?.body){
        res.status(400).send({message:"Request body is Required"})
    }

    if(!req.body.email || !req.body.password){
        return res.status(400).send({message:"email & password are valid"})
    }

    try {
        //find user by email
        const isExistsUser = await userModel.findOne({email : req.body.email})
        if(!isExistsUser){
            return res.status(400).send({message:"User doesn't exist"})
        }

        //match password by bcrypt.compare
        const isMatchPassword = await bcrypt.compare(
            req.body.password,
            isExistsUser.password
        )
        if(!isMatchPassword){
            return res.status(400).send({message:"Invalid Password"});
        }

        const {password,...rest}=isExistsUser._doc;

        //generate JWT token

        const token = jwt.sign({...rest},process.env.JWT_SECRET);
        return res.cookie("Access_Token",token).status(200).send({message:"Login Successfully",user:rest,token:token})
    } catch (error) {
        res.status(400).send({message:"Internal Server Error"})
    }
}