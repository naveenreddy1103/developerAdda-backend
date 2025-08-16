const express=require('express')
const authRouter=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/user')
const {validation}=require('../utils/validation')
const req = require('express/lib/request')

authRouter.post('/signup',async(req,res)=>{
    const {firstName,lastName,emailId,password}=req.body;
    
    try{
        // validation
        validation(req)

        // encrypt
        const passwordHash=await bcrypt.hash(password,10)
         
        // instance of userSchema for creating new user
        const user=new User({
            firstName,lastName,emailId,password:passwordHash
        })
        await user.save();
        res.send("user created")
    }catch(error){
        res.status(400).send({message:error.message,error:"error in signup"})
    }
})

authRouter.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body
        const user=await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invaild creditionals")
        }
        const afterHashedPassword=await user.hashedPassword(password)
        if(!afterHashedPassword){
            throw new Error("Invaild creditionals")
        }
        const token=await user.getJWT();
        res.cookie('token',token)
        res.send({message:"login successfully",userName:user.firstName+" "+user.lastName})
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})

authRouter.post('/logout',async(req,res)=>{
    try{
        res.cookie('token',null,{
            expires:new Date(Date.now())
        })
        res.send("logout success")
    }
    catch(error){
        res.send({messsage:error.message,data:"while logout error"}).status(5000)
    }
})

module.exports=authRouter;