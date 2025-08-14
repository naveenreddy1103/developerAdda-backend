const express=require('express')
const profileRouter=express.Router()
const {verifyToken}=require('../middleware/auth')

profileRouter.get('/profile',verifyToken,async(req,res)=>{
    try{
        const data=req.user;
        const userName=data.firstName+" "+data.lastName
        res.send(userName)
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})


module.exports=profileRouter