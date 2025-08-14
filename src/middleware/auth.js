const jwt=require('jsonwebtoken')
const User=require('../models/user')


const verifyToken=async(req,res,next)=>{
     try{
        const {token}=req.cookies
     if(!token){
        throw new Error("token not found")
     }
     const verifedToken=await jwt.verify(token,"token")
     const user=await User.findById(verifedToken._id)
     if(!user){
        throw new Error("user not found")
     }
     req.user=user

    //  console.log(verifedToken)
     next();
     }
     catch(error){
        res.status(400).send({message:error.message,error:"token error"})
    }


}

module.exports={
verifyToken
}