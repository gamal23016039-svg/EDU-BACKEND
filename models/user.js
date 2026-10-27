const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({

firstName:{
    type:String,
    required:true
},
lastName:{   
     type:String,
    required:true},
userName:{    
    type:String,
    required:true,
    unique:true,
    trim:true

},
email:{  
      type:String,
    required:true,
    unique:true,
    trim:true

},
password:{   
     type:String,
    required:true, select:false
},
role:{
    type:String,
    default:"Student",
    enum:["Student","Teacher","Admin"]

},
isVerified:{
type:Boolean ,
default:false
},
expiredAt:{
type:Date 
},
otp:{
type:String 
},
resetpasswordotp:{type:String },
expiredAt2:{
type:Date 
},
image:{},},{
   timestamps:true
})

module.exports=mongoose.model("user",UserSchema)



