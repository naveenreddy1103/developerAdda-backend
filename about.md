"dependencies": {
    "expressjs": "^5.1.0"   //^ it called caret. instead of caret we use '~'
  }


  version of package:- expressjs:'^5.1.0'

* why the version is 3 digits why it separated with dots[.]. why not single digit? *
  A.  digits are refers to
   first [1]:- major
   second [0]:- minor => adding new feacture with "back ward compactbility"
   third [1]:- patch => small change or any bug fix


* app.use() * :- This will match all the http methods API calls


* request Handler * :- 
   app.use('/',(req,res)=>{
    res.send("Hello world")
})
ex:-  (req,res)=>{
    res.send("Hello world")    // request handler
}

routes:-  '/'


* difference ^ caret and ~ tilde? *
^ caret:- caret allows minor and patch level updates automatically. but not in major.
~ tilde:- tilde version range operator. tilde allows patch level updates automatically. but not major and minor
without this operator it will not update anything.


* package.json file *:- It's like details about our project. it means versions and authoer, project name, dependencies


* app.js file: it's entry point for project.


* node_modules folder:- it stores libiraies related folders

* package.json inside dependencies feild :-
 it shows what we install package and it's version.


 * package-lock.json file:- it's lock's exact version packages and more.


 * listen:- listen is a keyword for listen requests.


 * "-g" global:- using this keyword we can install packages in globally.
     > npm install -g nodemon


* Updating scripts in package.json: *
scripts{
  "start": "node src/app.js",
  "dev?: "nodemon src/app.js"
}
  >npm run start // runs node server:- node src/app.js
  > npm run dev // runs nodemon server:- nodemon src/app.js



* HTTP Methods:- get, post, put, delete, patch

* .gitignore:- This file for igonering floders and files while stroing remotly in git  repo
   adding root of project
   Ex:- .gitignore file name
       inside:- node_modules


* git commands:-
git init => initliaze git into  our project
git add . or git add file_name => adding into files. "." dot refers all files (or)  use it  particular file
git commit -m "message" => commiting the the hole file with change of message
git remote add origin path => intialize path. storing remotly
git branch -M main
git push


* Routing:-
app.use():- This will match all the http methods api calls 
   using app.use() order is matter. because overide the routes
   => Ex:- app.use('/',(req,res)=>{res.send(hello)})
           app.use('/dashboard',(req,res)=>{res.send("welcome")})
           route requesting:-
           localhost:3000/    => hello
           localhost:3000/dashboard => hello
           [here order is problem. '/' we are starting route '/' that match second route thats why '/dashboard']

           solve this problem:-
          
           app.use('/dashboard',(req,res)=>{res.send("welcome")})
           app.use('/',(req,res)=>{res.send(hello)})
           route requesting:-
           localhost:3000/    => hello
           localhost:3000/dashboard => welcome
           [now work because order is correct]


* app.get() => This will only handle get call to particular route  what we pass.


* regular Expression in Routes:- it possible to use regular expression keywords.
  EX:- app.get('/ab?c',(req,res)=>{res.send("data")})
  Note:- express version 4 working but 5 they have change

* Regex Route:- /a/ This means we are accessing api routes that time 'a' character must anywhere in route
  Ex:- app.get(/a/,(req,res)=>{res.send("data")})

  localhost:1234/naveen  => data
  localhost:1234/bcd     => not found
  localhost:1234/a       => data

  Ex:- app.get(/.*fly$/,(req,res)=>{res.send("data")})
  now route url must end with 'fly' word


* query through params:- get data dynamically through queries
   Ex:- localhost:3000/user? userId=101
   app.get('/user',(req,res)=>{
    console.log(req.query);       // {userId:'101'}
    res.send("data")
   })

   localhost:3000/user/101
   app.get('/user/:userId',(req,res)=>{
    console.log(req.params)           // {userId:'101'}
    res.send("data)
   })


* Multi route handlers: one route can handle multiple handlers but inside route only one handler can send response.
=> multiple response it through error.
Ex:-  app.get('/user',(req,res)=>{
    console.log("1st handler")
    res.send("response")
},(req,res)=>{                             
    console.log("2nd handler");            
    res.send("response")
}
)
// it excute 1 handler after moving 2 handler throw error because one route only response

Ex2:- app.get('/user',(req,res,next)=>{
    console.log("1st handler")
    next()
},(req,res)=>{
    console.log("2nd handler");
    res.send("response")
}
)
// it excute 1 handler and 2 handler because it return response in 2nd handler.
// here coming to next() is important


* next():- next() function using to move one handler to another handler. 
         without next not possible to move another handler

         EX:- app.get('/user',(req,res,next)=>{
    console.log("1st handler")
    
},(req,res)=>{
    console.log("2nd handler");
    res.send("response")
}
)
// error not passing next.

ex 2:-
app.get('/user',(req,res,next)=>{
    console.log("1st handler")
    next()
},(req,res)=>{
    console.log("2nd handler");
    res.send("response")
}
)   // without error



* Middleware :- is nothing but request handler with next() function.
           using verify token or others.
EX:-
app.use('/admin',(req,res,next)=>{
    console.log('admin checked')
    const token='xyz'
    const verify= token==='xyz'
    if(!verify){
        res.send("token not found")
    }
    else{
        next()
       console.log(verify)
    }
})

app.get('/admin/getAdmin',(req,res,next)=>{
    console.log("getting admin")
    res.send('get admin data')
})
app.get('/admin/deleteAdmin',(req,res)=>{
    console.log('deleted')
    res.send("deleted admin")
   
})

       or using separate file for middleware
src/middleware/ auth.js

const auth=(req,res,next)=>{
    console.log('user authtication checked')
    const token='xyz'
    const verify= token==='xyz'
    if(!verify){
        res.send('token not found').status(401)
    }
    else{
        next()
    }
}

module.exports={
    auth
}

app.js:-
const {auth}=require('./middleware/auth')

app.use('/admin',auth)

app.get('/admin/getAdmin',(req,res,next)=>{
    console.log("getting admin")
    res.send('get admin data')
})
app.get('/admin/deleteAdmin',(req,res)=>{
    console.log('deleted')
    res.send("deleted admin")
   
})

//if we don't auth for every route  directly pass as handler
// app.get('/admin',auth,(req,res)=>{})  no need to use app.use()


* difference between app.use() and app.all()
A) this two function seruve same but small differ.
app.use():- we can use next() function move to another
app.all():- next() function not work. send route data to all http methods
Ex:- 
const express = require('express');
const app = express();

// Security check for everyone entering /admin
app.use('/admin', (req, res, next) => {
  console.log('Security check (app.use)');
  next(); // let the request continue
});

// Handles any method like GET, POST to /admin
app.all('/admin', (req, res) => {
  console.log('Reception (app.all)');
  res.send(`Welcome to admin via ${req.method}`);
});

app.listen(1234, () => {
  console.log("Server running at http://localhost:1234");
});



* Error Handling:- handle the erros. by using
syntax:- try{success}catch(error){error}finally(){always}
- in our code some error. add end of code

app.use('/route',(err,req,res,next)=>{
  if(err){
    res.send("ther is a error")
  }
})


request Handler parameters:- order
(req,res)       //if two
(req,res,next)   // if three
(err,req,res,next)  // if four



#            6.Database, Schema & models mongoose

config:- it's folder this used configuration data
src/config/database.js
// mongoose using for creating  database and models
// data storing in mongodb atlas. create cluster and copy string and use it

database.js
const mongoose=require('mongoose')
const dbConnect=async()=>{
    await mongoose.connect(
        "mongodb+srv://Nodejs:Nodejs@cluster0.r72zfn1.mongodb.net/developerAdda"
    )
}

module.exports=dbConnect

// entry point for project app.js
const express=require('express');
const app=express();
const dbConnect=require('./config/database')

dbConnect().then(()=>{
    console.log("database connected success");
    app.listen(1234,()=>{
    console.log(`server start at:- localhost:1234`)
})
}).catch((error)=>{
  console.error(error.message)
})

// always run "listen port" after database connection because 
// if database problem but running listen port that's why 1st database after port

## create a userSchema & user Model
 creating Schema and model inside folder models

 /src/models/user.js
 const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
    age:{
        type:Number
    }
})

module.exports=mongoose.model('User',userSchema)

## create Post/ signup API to add data to database

const express=require('express');
const app=express();
const dbConnect=require('./config/database')
const User=require('./models/user')

app.post('/signup',async(req,res)=>{
    //creating a new instance of the user model
    const user=new User({
        firstName:'Naveen',
        lastName:'kama',
        emailId:'naveen@gmail.com',
        password:'1234'
    });
    try{
        await user.save();
        res.send("User created success")
    }catch(error){
        res.send({message:error.message}).status(400)
    }
})

dbConnect().then(()=>{
    console.log("database connected success");
    app.listen(1234,()=>{
    console.log(`server start at:- localhost:1234`)
})
}).catch((error)=>{
  console.error(error.message)
})

## push some documents  using api call from databases
localhost:1234/signup

output in database:-

_id:objetId(68807af573c8ecd38ca13186)
firstName:"Naveen"
lastName:"kama"
emailId:"naveen@gmail.com"
password:"1234"
__v:0 

// _id:- it store unique id for every document
// _v: it refers version for document. if changes happen version increment automatic
   Ex:- _v:1


## Error Handling using try and catch
try{success}catch(error){console.error(err.message)}




#                7. diving into API's

## difference between JSON and JavaScript object
Json :- text based format, used for data exchange, "key" must be double
        it supports only string, number, boolean, null, array, object only
        comments are not allowed          
        EX:- {
          "name":"naveen",
          "age":23,
          "isStudent:true
        }       
        JS Object → JSON string        	JSON.stringify(object)
        Json language is indipendent: it works in python, java etc

js object:- Native in js, used for logic , no need to put double quote key
        it supports function, symbols, etc.
        comments allowed
        EX:- {
          name:"naveen",
          age:23,
          isStudent:true,          // comments allowed
          greet:()=>{
            console.log("hello")
          }
        }

        JSON string → JS Object	JSON.parse(jsonString)
        JavaScript Object is specific to JavaScript

## adding express.json() middleware to your app
  app.use(express.json())

## sign Api dynamic to receive data from user end
app.post('/signup',async(req,res)=>{
    // instance of userSchema for creating new user
    const user=new User(req.body)
    try{
        await user.save();
        res.send("user created")
    }catch(error){
        res.status(400).send({message:error.message})
    }
})

## api get user by email from user end
app.get('/user',async(req,res)=>{
    try{
        const user=await User.find({emailId:req.body.emailId})
        res.send(user)
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})

## Feed API -get /feed - get all users from the database
// feed Api geting all users using find()
app.get('/feed',async(req,res)=>{
    try{
        const users=await User.find()
        res.send({users:users})
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})

## get Api by user id
app.get('/user',async(req,res)=>{
    const userId=req.body.userId
    try{
        const user=await User.findById(userId)
        res.send(user)
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})

## difference between PATCH and PUT

| Feature  | PUT                                  | PATCH                               |
| -------- | ------------------------------------ | ----------------------------------- |
| Sends    | Entire object                        | Only changed fields                 |
| Risk     | May overwrite fields if not included | Safely updates only specific fields |
| Use when | Replacing whole resource             | Making partial edits                |


## API update user
// update user by _id
app.patch('/user',async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body
    try{
        const user=await User.findByIdAndUpdate(userId,data)
        console.log(user)
        res.send("user updated")
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})

## explore mongoose document inside model methods


## Api update the user with email id
// update user with email
app.patch('/user',async(req,res)=>{
    const emailId=req.body.emailId;
    const data=req.body
    try{
        const user=await User.findOneAndUpdate({emailId:emailId},data,options)
        console.log(user)
        res.send("user updated")
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})

## options:-{ returnDocument:"after"}  => return  the document before update in console.
                       we are not mention "after". by default is "before".
         {runValidators:ture}  => it enables validation at the time of upadate. 
         etc ......




#          8. Data sanitization & schema validation


Schema types:-
Ex:-   const userShema=new mongoose.Schema({
    fieldName:{
        type:String,
        required:true,
        unique:true,
        minLength:2,
        maxLength:50,
        lowercase:true,
        uppercase:true,
        trim:true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not vaild")
            }
        },
        default:"if won't write i'll set default value"
    },
    feildName:{
        type:[String]    // allows array of strings
    },
    feildName:{
        type:Number,
        min:4,
        max:10
    }
},{timestamps:true})

## timestamps:- timestamps:true

## Add API level validation on patch request and put request
app.patch('/user/:userId',async(req,res)=>{
    const userId=req.params.userId;
    const data=req.body
    try{
        const validateField=["password","profile","skills"]
        const updatesData=Object.keys(data).every((k)=>{
           return validateField.includes(k)
        })
        if(!updatesData){
            throw new Error("update not found")
        }
        if(data.skills.length>5){
            throw new Error("skills less than 5")
        }
        const user=await User.findByIdAndUpdate(userId,data,
            {
                runValidators:true
            }
        )
        console.log(user)
        res.send("user updated")
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})

## install validator 
  >npm i validator  //using enbale validation inside Schema and APi's level


## Explore validator libary function and use validator funcs for password, email
     EX:- In Schema level by using mongoose validate function we enable validator
     const validator=require("validator")
     const userShema= new mongoose.Schema({
        email:{
            type:String,
            validate(value){
              if(validator.isEmail(value)){
                throw new Error("check email format")
              }
            }
        }
     })

    => validator functions:- isEmail(value), isStrongPassword(value) etc..
     
     EX:- In Api level using in validator
     app.post('/signup',async(req,res)=>{
    // instance of userSchema for creating new user
    const user=new User(req.body)
    try{
        if(req.body.skills.length>5){
            throw new Error("skills less than 5")
        }
        if(!validator.isStrongPassword(req.body.password)){
            throw new Error("check password one")
        }
        await user.save();
        res.send("user created")
    }catch(error){
        res.status(400).send({message:error.message})
    }
})

## Never trust request body:- because it allow all data anything we need enbale validation.



#                        9. Encrypting Password

## Validate signUp Api by using different file for maintain validation
- validation we can write different file for reusebility and readbility and maintainbility 

     EX:- /src/utils (or) helpers/validation.js
     const validator=require("validator")

const validation=(req)=>{
     const {firstName,lastName,password,emailId}=req.body
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

module.exports={validation}


        requering in routes > app.js
        const {validation}=require('./src/utils/validation')
        app.post('/signup',async(req,res)=>{
            validation(req)
        })


## creating hash password and compare with hashed password by using bcrypt 

> npm i bcrypt

       EX:- const bcrypt=require('bcrypt');

       app.post('/signup',async(req,res)=>{
        const hashedPassword=await bcrypt.hash("password",10);
        // save password in database
       })

       app.post('/login',async(req,res)=>{
        const comparePassword=await bcrypt.compare("password","dbPassword");
        //if success login the user
       })





#                     10. Authentication, JWT & cookies

## install cookie parser
--> express by default provide method for storing cookie
      syntax:- res.cookie('Name',value)
   // we can set expire for cookie:- res.cookie(name,token,{expires: new Date(Date.now() + 8 * 3600000)})
--> if we want request the token. we need module called "cookie-parser"
     >npm i cookie-parser
     getting cookie:-
     syntax:-
     const cookie=require('cookie-parser')
     app.use(cookie())
     const value=req.cookies

## json web token:- jsonwebtoken it create unique token for every user. based on user data.
--> Using token secure user api routes. when login the user we took user id. with we generate token.
--> we need jsonwebtoken libarary
     > npm i jsonwebtoken
     syntax:-
     const jwt=require('jsonwebtoken')
     const cookie=require('cookie-parser')
     app.use(cookie())

     app.post('/login',async(req,res)=>{
          const token=await jwt.sign({_id:userId},"secertKey",{expiresIn:'1d'})
          // expires parameter optional:-  1d=> 1 day, 1h=> 1 hour .....
          res.cookie('token',token)
     })
     // verify token
     app.get('/profile',async(req,res)=>{
            const token=req.cookies
            const veryfiedToken=await jwt.verify(token,"secertKey")
     })

     EX:- 
     app.js
     const jwt=require('jsonwebtoken')
     const {verifyToken}=require('./middleware/auth')
     app.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invaild creditionals")
        }
        
        const afterHashedPassword=await bcrypt.compare(password,user.password);
        if(!afterHashedPassword){
            throw new Error("Invaild creditionals")
        }
        const token= await jwt.sign({_id:user._id},"token") 
        // we can expire in token:- jwt.sign({user data},key,{expiresIn:'1h'}) / 
        // h=> hours, d=>days ...
        res.cookie('token',token)
        // we can set expire for cookie:- res.cookie(name,token,{expires: new Date(Date.now() + 8 * 3600000)})
        res.send({message:"user login success",data:user})
    }
    catch(error){
        res.status(400).send({message:error.message})
    }
})

app.get('/profile',verifyToken,async(req,res)=>{
    try{  
        res.send(req.user)
    }
    catch(error){
        res.status(400).send({message:error.message})
    }
})
 
-->    middleware.js

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
        res.status(400).send({message:error.message})
    }


}

module.exports={
verifyToken
}




## create userSchema  methods to getJWT():-

--> inside login route without creating json web token we directly assigned to "schema methods"
--> in userSchema every user is instances of userSchema.
--> JWT token is a user related that's why directly assigned userSchema as method
--> when token needed we directly call "getJWT method"
--> it's works like class, object and methods

EX:-
    >/src/models/user.js
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    feilds ....
},{timestamps:true})

userSchema.methods.getJWT=async function () {
    const user=this;
    const token=await jwt.sign({_id:user._id},"token",{
        expiresIn:'7d'
    }) 
 return token;
}

module.exports=mongoose.model('User',userSchema)

-->   app.js
app.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invaild creditionals")
        }

        const token= await """"user.getJWT() """""
        res.cookie('token',token)
        // we can set expire for cookie:- res.cookie(name,token,{expires: new Date(Date.now() + 8 * 3600000)})
        res.send({message:"user login success",data:user})
    }
    catch(error){
        res.status(400).send({message:error.message})
    }
})



## create userSchema method to comparePassword(passwordUserByInput) using bcrypt

--> inside login route without comparing bcrypt password we directly assigned to "schema methods"
--> in userSchema every user is instances of userSchema.
--> Password is a user related that's why directly assigned userSchema as method
--> when comparing password required we directly call "password method"

EX:-  
     >/src/models/user.js
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


--> app.js

app.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invaild creditionals")
        }
        
        const afterHashedPassword=await """"user.hashedPassword(password)""""
        if(!afterHashedPassword){
            throw new Error("Invaild creditionals")
        }
        const token= await user.getJWT()
        res.cookie('token',token)
        // we can set expire for cookie:- res.cookie(name,token,{expires: new Date(Date.now() + 8 * 3600000)})
        res.send({message:"user login success",data:user})
    }
    catch(error){
        res.status(400).send({message:error.message})
    }
})




##                    11. Diving into the Api's and express Router 


## Explore tinder Api's
## create a list all api's you can think of in dev tender.
-##group multiple routes under respective routers.
   src/routes/auth.js
      authRouter have signIn, logIn, logout...

## read documentation for express.Router()
   - it also like works in individual routes
   EX:-
   const express=require('express')
   const app=express()
   app.post('/signIn',async(req,res)=>{})    // indivual

   src/routes/auth.js
   const express=require('express')
   const authRouter=express.Router()
   authRouter.post('/signIn',async(req,res)=>{})    //group routes

## create authRouter, profileRouter, requestRouter
   src/routes/auth.js     // this are authication routes under router
   
   const express=require('express')
const authRouter=express.Router()
const bcrypt=require('bcrypt')
const User=require('../models/user')
const {validation}=require('../utils/validation')

authRouter.post('/signup',async(req,res)=>{
    const {firstName,lastName,emailId,password}=req.body;
    
    try{
        // validation
        validation(req)

        // encrypt
        const passwordHash=await bcrypt.hash(password,10)
         
        // instance of userSchema for creating new user
        const user=new User({
            firstName,lastName,emailId,password:passwordHash
        })
        await user.save();
        res.send("user created")
    }catch(error){
        res.status(400).send({message:error.message,error:"error in signup"})
    }
})

authRouter.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body
        const user=await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invaild creditionals")
        }
        const afterHashedPassword=await user.hashedPassword(password)
        if(!afterHashedPassword){
            throw new Error("Invaild creditionals")
        }
        const token=await user.getJWT();
        res.cookie('token',token)
        res.send({message:"login successfully",userName:user.firstName+" "+user.lastName})
    }
    catch(error){
        res.send({message:error.message}).status(400)
    }
})

module.exports=authRouter;

## import these routers is app.js 
   const authRouter=require('./routes/auth')

   app.use('/',authRouter)

## create post /logout
    authRouter.post('/logout',async(req,res)=>{
    try{
        res.cookie('token',null,{
            expires:new Date(Date.now())
        })
        res.send("logout success")
    }
    catch(error){
        res.send({messsage:error.message,data:"while logout error"}).status(5000)
    }
})

## make you validate all data in every post,patch api's

const validateUserEdit=(req)=>{
   const editFeilds=["gender","age","skills","profile"];
   const validateFeilds=Object.keys(req.body).every((k)=>editFeilds.includes(k))
   const {skills,age}=req.body
  
   if(!validateFeilds){
    throw new Error("can't few feilds")
   }
   if((skills.length)>5){
    throw new Error("skills less than five")
    
   }
   if(age>95){
       throw new Error("age must less than 95")
   }
}
## create patch /profile/edit
profileRouter.patch('/profile/edit',verifyToken,async(req,res)=>{
    try{
        validateUserEdit(req)
        const requestData=req.body
        const userData=req.user
        Object.keys(req.body).map(key=>userData[key]=requestData[key])
        await userData.save();
        res.send({message:"good",data:userData})
        
    }
    catch(error){
        res.send({message:error.message,data:"error in edit profile"})
    }
})

## create patch /profile/password    //forgot password
 - Router 
// password forgot by using mail, first Name and lastName 
profileRouter.patch('/profile/password',async(req,res)=>{
    try{
        forgotPasswordValidation(req)
        const {email,firstName,lastName,password}=req.body
        const user=await User.findOne({emailId:email})
        const hashedPassword=await bcrypt.hash(password,10)
        if(!user || (!user.firstName==firstName) || (!user.lastName==lastName) ){
            throw new Error("data is incorrect")
        }
        
        const data={password:hashedPassword}
        await User.findByIdAndUpdate(user._id,{$set:data})
        res.send({message:`${user.firstName} updated successfully`})
    }
    catch(error){
        res.send({message:error.message,data:"error forgot in password"})
    }
})

  - validation
  const forgotPasswordValidation=(req)=>{
  const requestData=req.body
  const validateDate=["email","firstName","lastName","password"]
  const afterValidation=Object.keys(requestData).every((key)=>validateDate.includes(key))
  if(!requestData.email){
    throw new Error("email required")
  }
  if(!validator.isEmail(requestData.email)){
    throw new Error("check email")
  }
  if(!requestData.firstName){
    throw new Error("firstName required")
  }
  if(!requestData.lastName){
    throw new Error("lastName required")
  }
   if(!requestData.password){
    throw new Error("Password required")
  }
  if(!validator.isStrongPassword(requestData.password)){
    throw new Error("check Password")
  }
  if(!afterValidation){
    throw new Error("feilds not found")
  }
}


#                11. Logical DB Query and compound indexes

## create connection request schema 

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

- mongoose method pre is a hook (or pre middleware) is a function you define on a schema
that runs before a certian action happens

schema.pre(<action>, function(next) {
    // your logic here
    next(); // call next() to continue
});

<action> → the operation name (like "save", "remove", "updateOne", "findOneAndUpdate", etc.)

next() → tells Mongoose to move to the next middleware or proceed with the operation

createConnectionSchema.pre("save",function(next){
   const schema=this;
   if(schema.fromUserId.equals(schema.toUserId)){
      throw new Error("yourself you can't send request")
   }
   next();
})

const conncetionSchema=mongoose.model('CreateConnection',createConnectionSchema)
module.exports=conncetionSchema

## send connection request API

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
           res.send({message:`${req.user.firstName} was ${status} to ${toUserId}`})
        }
        catch(error){
            res.status(500).send({
                message:error.message
            })
        }
    }
)

## proper validation for data 
## Think all about corner cases[means find unwanted sending data and soon]
## indexes are make our query fast if in more data



#              12. Ref & populate & thought process of writing API's

## write a code with proper validation POST //request/review/:accepted or rejected/:requestId
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

## Thought process Post vs GET

   - POSt:- while posting data we need verify every feilds from user because may send unwanted 
            we can't in database without verifying
   - get:- while getting data we can't show entire what required from we show that data only
     ................

## read about ref and populate
## create get  /user/request/received with all the checks 

const express=require('express')
const userRouter =express.Router()
const {verifyToken}=require('../middleware/auth')
const Connection=require('../models/connectionRequest')


// getting all pending connections
userRouter.get('/user/request/received',verifyToken,async(req,res)=>{
     try{
        const user=req.user;
        const connectionDb=await Connection.find({
            toUserId:user._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName gender age skills profile")
        res.json({
            message:connectionDb
        })
     }
     catch(error){
        res.status(400).json({
            message:error.message
        })
     }
})

module.exports=userRouter


## create get get/user/connections
-  all accepted connections based login user

userRouter.get('/user/connections',verifyToken,async(req,res)=>{
    try{
        const user=req.user
        const connections=await Connection.find({
            $or:[{status:"accepted",fromUserId:user._id}
                ,{status:"accepted",toUserId:user._id}]
        }).populate("fromUserId",requiredUserData)
        .populate("toUserId",requiredUserData)
        const data=connections.map(row=>{
            if(user._id.toString()!==row.fromUserId._id.toString()){
                return row.fromUserId
            }
            else if(user._id.toString()!==row.toUserId._id.toString()){
                return row.toUserId
            }
            else{
                return "Not avaible"
            } 
                //[or]
            // if(user._id.toString()===row.fromUserId._id.toString()){
            //     return row.toUserId;
            // }
            // return row.fromUserId
        })
        res.json({
            message:data
        })
    }
    
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})


