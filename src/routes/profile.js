const express=require('express')
const profileRouter=express.Router()
const {verifyToken}=require('../middleware/auth')
const {validateUserEdit,forgotPasswordValidation}=require('../utils/validation')
const User=require('../models/user')
const bcrypt=require('bcrypt')

profileRouter.get('/profile/view',verifyToken,async(req,res)=>{
    try{
        const data=req.user;
        // const userName=data.firstName+" "+data.lastName
        res.json({
            firstName:data.firstName,
            lastName:data.lastName,
            profile:data.profile,
            skills:data.skills,
            emailId:data.emailId
        })
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})

profileRouter.patch('/profile/edit',verifyToken,async(req,res)=>{
    try{
        validateUserEdit(req)
        const requestData=req.body
        const userData=req.user
        Object.keys(req.body).map(key=>userData[key]=requestData[key])
        await userData.save();
        res.status(200).send({message:"Proile updated successfully",data:userData})
        
    }
    catch(error){
        // const status = error.message.includes("field") || error.message.includes("age") ? 400 : 500
        res.status(500).send({message:error.message,data:"error in edit profile"})
    }
});

// password forgot by using mail, first Name and lastName 
profileRouter.patch('/profile/password',async(req,res)=>{
    try{
        forgotPasswordValidation(req)
        const {email,firstName,lastName,password}=req.body
        const user=await User.findOne({emailId:email})
        const hashedPassword=await bcrypt.hash(password,10)
        if(!user || (!user.firstName==firstName) || (!user.lastName==lastName) ){
            throw new Error("data is incorrect")
        }
        
        const data={password:hashedPassword}
        await User.findByIdAndUpdate(user._id,{$set:data})
        res.status(200).send({message:`${user.firstName} updated successfully`})
    }
    catch(error){
        res.status(500).send({message:error.message,data:"error forgot in password"})
    }
})


module.exports=profileRouter