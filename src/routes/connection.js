const express=require("express")
const connectionRouter=express.Router()
const Connection=require("../models/connectionRequest")
const User=require("../models/user")
const {verifyToken}=require('../middleware/auth')



connectionRouter.post('/request/send/:status/:toUserId',verifyToken,
    async(req,res)=>{
        try{
            const fromUserId=req.user._id
            const toUserId=req.params.toUserId
            const status=req.params.status

            

            //verifying to userId is exit in db or not
            const toUser= await User.findById(toUserId)
            if(!toUser){
                throw new Error("toUser not found")
            }
   
            // verifying connection already send or not
            const verifyConnection=await Connection.findOne({
                $or:[{fromUserId,toUserId},
                    {fromUserId:toUserId,toUserId:fromUserId}]})

            if(verifyConnection){
                throw new Error("already connected")
            }

            // instance of Connecction Schema
            
            const connection=new Connection({
                 fromUserId:fromUserId,toUserId:toUserId,status:status
           })
           await connection.save();
           res.send({message:`${req.user.firstName} was ${status} on ${toUser.firstName}`})
        }
        catch(error){
            res.status(500).send({
                message:error.message
            })
        }
    }
)

connectionRouter.post('/request/review/:status/:requestId',verifyToken,
    async(req,res)=>{
        try{
            const {requestId,status}=req.params
            const loginUser=req.user
        const vaildValue=["accepted","rejected"]
        const statusValidate=vaildValue.includes(status)
        if(!statusValidate){
            throw new Error("invaild status")
        }
        const connectionData=await Connection.findOne({
            _id:requestId,
            toUserId:loginUser._id,
            status:"interested"
        })

        if(!connectionData){
            throw new Error("Connection not found")
        }
       
        connectionData.status=status
        await connectionData.save();

        res.json({
            message:status +"success"
        })

        }
        catch(error){
            res.status(400).json({
                message:error.message
            })
        }
    }
)

module.exports=connectionRouter