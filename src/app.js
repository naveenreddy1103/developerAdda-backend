
const express=require('express');
const app=express();
const dbConnect=require('./config/database')
const cors=require('cors')

const cookie=require('cookie-parser')

app.use(express.json()) // json middleware
app.use(cookie()) // cookie middleware
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))


const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const connectionRouter=require('./routes/connection')
const userRouter=require('./routes/user')

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',connectionRouter)
app.use('/',userRouter)



dbConnect().then(()=>{
    console.log("database connected success");
    app.listen(1234,()=>{
    console.log(`server start at:- localhost:1234`)
})
}).catch((error)=>{
  console.error(error.message)
})

