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

const validateUserEdit = (req) => {
  const editFeilds = ["gender", "age", "skills", "profile", "firstName", "lastName", "about"];
  const validateFeilds = Object.keys(req.body).every((k) => editFeilds.includes(k));

  const { skills, age } = req.body;

  if (!validateFeilds) {
    throw new Error("Can't edit disallowed fields");
  }

  if (skills && skills.length > 5) {
    throw new Error("Skills must be less than five");
  }

  if (age > 95) {
    throw new Error("Age must be less than 95");
  }
};


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

module.exports={validation,validateUserEdit,forgotPasswordValidation}