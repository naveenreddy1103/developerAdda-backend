const express=require('express')
const userRouter =express.Router()
const {verifyToken}=require('../middleware/auth')
const Connection=require('../models/connectionRequest')
const User=require('../models/user')

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

// feed api for getting all 

userRouter.get('/feed',verifyToken,async(req,res)=>{
    try{
        const logginUser=req.user;
        const page=parseInt(req.query.page)|| 1
        let limit=parseInt(req.query.limit)||10
         limit= limit>50?50:limit
         const skip=(page-1)*limit
        const connectionUser=await Connection.find({
            $or:[{fromUserId:logginUser._id},{toUserId:logginUser._id}]
        }).select("fromUserId toUserId")
        // select method:- it used for getting only selected feilds 

        //In JavaScript, new Set() creates a Set object, which stores unique values (no duplicates allowed).
        const hideFeedUsers=new Set()
        connectionUser.map(ids=>{
            hideFeedUsers.add(ids.fromUserId.toString())
            hideFeedUsers.add(ids.toUserId.toString())
        })

        const user= await User.find({
            $and:[{_id:{$nin:Array.from(hideFeedUsers)}},{_id:{$ne:logginUser._id}}]
        }).select(requiredUserData)
        .skip(skip)
        .limit(limit)

       // .skip() and .limit() methods 
       // skip:- will skip number of record
       // limit:- will set number of records reterive

        res.json({
            message:user
        })
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

module.exports=userRouter