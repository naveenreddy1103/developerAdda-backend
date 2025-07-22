"dependencies": {
    "expressjs": "^5.1.0"   //^ it called caret. instead of caret we use '~'
  }


  version of package:- expressjs:'^5.1.0'

why the version is 3 digits why it separated with dots[.]. why not single digit?
  A.  digits are refers to
   first [1]:- major
   second [0]:- minor => adding new feacture with "back ward compactbility"
   third [1]:- patch => small change or any bug fix

request Handler:- 
   app.use('/',(req,res)=>{
    res.send("Hello world")
})
ex:-  (req,res)=>{
    res.send("Hello world")
}

routes:-  '/'

difference ^ caret and ~ tilde?
^ caret:- caret allows minor and patch level updates automatically. but not in major.
~ tilde:- tilde version range operator. tilde allows patch level updates automatically. but not major and minor
without this operator it will not update anything.

package.json file:- It's like details about our project. it means versions and authoer, project name, dependencies

app.js file: it's entry point for project.

node_modules folder:- it stores libiraies related folders

dependencies feild in package.json:-
 it shows what we install package and it's version.

 package-lock.json file:- it's lock's exact version packages and more.

 listen:- listen is a keyword for listen requests.

 "-g" global:- using this keyword we can install packages in globally.
     > npm install -g nodemon

Updating scripts in package.json:
scripts{
  "start": "node src/app.js",
  "dev?: "nodemon src/app.js"
}
  >npm run start // runs node server:- node src/app.js
  > npm run dev // runs nodemon server:- nodemon src/app.js