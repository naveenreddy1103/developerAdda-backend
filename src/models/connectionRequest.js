const mongoose=require("mongoose")

const createConnectionSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored"],
            message:`{VALUE} incorrect status type`
        }
    }
},{timestamps:true})

createConnectionSchema.pre("save",function(next){
   const schema=this;
   if(schema.fromUserId.equals(schema.toUserId)){
      throw new Error("yourself you can't send request")
   }
   next();
})

const conncetionSchema=mongoose.model('CreateConnection',createConnectionSchema)
module.exports=conncetionSchema
