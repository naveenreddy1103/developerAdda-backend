const validator=require("validator")

const validation=(req)=>{
     const {firstName,lastName,password,emailId}=req.body
   try{
     if(!firstName || !lastName){
        throw new Error("firstName and lastName must be not empty")
    }
    if(!validator.isEmail(emailId)){
        throw new Error("check email")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password must be strong")
    }
   }
   catch(error){
     console.log(error.message)
   }

}

module.exports={validation}