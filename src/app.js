// entry point for project app.js
const express=require('express');
const app=express();


app.use('/dashboard',(req,res)=>{
    res.send("Welcome to dashboard")
   
})
app.use('/',(req,res)=>{
    res.send("Hello world")
})



app.listen(1234,()=>{
    console.log(`server start at:- localhost:1234`)
})