
const express=require('express');
const app=express();
const dbConnect=require('./config/database')

const cookie=require('cookie-parser')

app.use(express.json()) // json middleware
app.use(cookie()) // cookie middleware


const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')

app.use('/',authRouter)
app.use('/',profileRouter)






dbConnect().then(()=>{
    console.log("database connected success");
    app.listen(1234,()=>{
    console.log(`server start at:- localhost:1234`)
})
}).catch((error)=>{
  console.error(error.message)
})

