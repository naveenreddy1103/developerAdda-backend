const mongoose=require('mongoose')

const dbConnect=async()=>{
    await mongoose.connect(
        "mongodb+srv://Nodejs:Nodejs@cluster0.r72zfn1.mongodb.net/developerAdda"
    )
}

module.exports=dbConnect