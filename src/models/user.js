const validator=require('validator')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("email is not vaild")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender not vaild");
                
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    skills:{
        type:[String]
    },
    profile:{
        type:String,
        default:"https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg"
    }
},{timestamps:true})

userSchema.methods.getJWT=async function () {
    const user=this;
    const token=await jwt.sign({_id:user._id},"token",{
        expiresIn:'7d'
    }) 
 return token;
}

userSchema.methods.hashedPassword=async function(password){
    const user=this;
    const userInputPassword=password
    const isVerfiedPassword=await bcrypt.compare(userInputPassword,user.password);
    return isVerfiedPassword;
}

module.exports=mongoose.model('User',userSchema)