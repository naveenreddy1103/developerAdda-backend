const express=require('express')
const userRouter =express.Router()
const {verifyToken}=require('../middleware/auth')
const Connection=require('../models/connectionRequest')

const requiredUserData="firstName lastName gender age skills profile"


// getting all pending connections
userRouter.get('/user/request/received',verifyToken,async(req,res)=>{
     try{
        const user=req.user;
        const connectionDb=await Connection.find({
            toUserId:user._id,
            status:"interested"
        }).populate("fromUserId",requiredUserData)
        res.json({
            message:connectionDb
        })
     }
     catch(error){
        res.status(400).json({
            message:error.message
        })
     }
})

//all accepted connections based login user
userRouter.get('/user/connections',verifyToken,async(req,res)=>{
    try{
        const user=req.user
        const connections=await Connection.find({
            $or:[{status:"accepted",fromUserId:user._id}
                ,{status:"accepted",toUserId:user._id}]
        }).populate("fromUserId",requiredUserData)
        .populate("toUserId",requiredUserData)
        const data=connections.map(row=>{
            if(user._id.toString()!==row.fromUserId._id.toString()){
                return row.fromUserId
            }
            else if(user._id.toString()!==row.toUserId._id.toString()){
                return row.toUserId
            }
            else{
                return "Not avaible"
            } 
                //[or]
            // if(user._id.toString()===row.fromUserId._id.toString()){
            //     return row.toUserId;
            // }
            // return row.fromUserId
        })
        res.json({
            message:data
        })
    }
    
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

module.exports=userRouter