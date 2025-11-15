const mongoose=require('mongoose')

const dbConnect=async()=>{
    await mongoose.connect(
        "mongodb://localhost:27017/developerAdda"
    )
}

module.exports=dbConnect

// mongodb+srv://Nodejs:Nodejs@cluster0.r72zfn1.mongodb.net/developerAdda


