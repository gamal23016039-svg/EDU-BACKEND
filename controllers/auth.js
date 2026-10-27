const user = require("../models/user") 
const bcrypt =require("bcrypt")
const crypto=require("crypto")
const jwt =require("jsonwebtoken")
const sendEmail=require("../email")
const nodemailer=require("nodemailer")

const register= async(req,res)=>{
  try{
     const{firstName,lastName,userName,email,password,confirmPassword,role}=req.body
    const userNamecheck= await user.findOne({userName:userName})
    if(userNamecheck){
    return res.status(409).json({status:"fail",msg:"this username is used before please use other "})
    }
const emailcheck= await user.findOne({email:email})
   if(emailcheck){
    return res.status(409).json({status:"fail",msg:"this email used before"})
    }
    if(password!==confirmPassword){
     return res.status(400).json({status:"fail",msg:"the password not equal confirmPassword"})
    }
    const hashpassword = await bcrypt.hash(password,10)
    const userotp =await crypto.randomInt(100000, 999999).toString(); 
    const hashotp=await bcrypt.hash(userotp,10)

    const User = new user({
  firstName,lastName,
  userName,
  email,
  password:hashpassword
  ,role:"Student",
  otp:hashotp,
  isVerified:false,
  expiredAt:Date.now()+5*60*1000
    })
await User.save()
await sendEmail({
to: User.email,
subject: "Verify Your Account",
html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>Welcome, ${User.userName} 👋</h2>

    <p>Use the verification code below to activate your account on <strong>ELZAEM</strong>.</p>

    <div style="
      background-color: #f4f4f4;
      padding: 15px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 5px;
      border-radius: 8px;
      margin: 20px 0;
    ">
      ${userotp}
    </div>

    <p>This code will expire in <strong>5 minutes</strong>.</p>

    <p>If you didn't request this code, you can safely ignore this email.</p>

    <hr style="margin: 20px 0;" />

    <p>Thank you for choosing ELZAEM.</p>
  </div>
`
});
res.status(200).json({status:"success",data:{User}})
  }
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
} 
const login =async (req,res)=>{
try{
const {email ,password }=req.body
const emailcheck= await user.findOne({email:email}).select('+password')
   if(!emailcheck){
    return res.status(400).json({status:"fail",msg:"wrong: this email not exist"})
    }
const passwordcheck= await bcrypt.compare(password,emailcheck.password)
   if(!passwordcheck){
    return res.status(400).json({status:"fail",msg:" this password wrong"})
}
    if(emailcheck.isVerified == false){
    return res.status(403).json({
        status:"fail",
        msg:"Please verify your email first."
    })
}
const token = jwt.sign({id:emailcheck._id,role:emailcheck.role},process.env.secretkey,{expiresIn:'30m'})
res.status(200).json({status:"success",msg:"welcome"+" "+emailcheck.userName,data:{token}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
// const getalluser=async(req,res)=>{
// try{   
//     const users = await user.find({}) 
//    if(!users){
//    return res.status(400).json({status:"fail",data:null})
//    }
// return res.status(200).json({status:"success",data:{users}})}
// catch(error){
// res.status(404).json({status:"error",msg:"error 404"}) 
// }}
// const getsingleuser=async(req,res)=>{
// try{   
//     const userId=req.params.id
// const users = await user.findById(userId) 
//    if(!users){
//    return res.status(400).json({status:"fail",msg:"user not found "})
//    }
// return res.status(200).json({status:"success",data:{users}})}
// catch(error){
// res.status(404).json({status:"error",msg:"error 404"}) 
// }
// } 
// const deleteuser=async(req,res)=>{
// try{   
// const userId=req.params.id
// const user = await user.findByIdAndDelete(userId) 
//    if(!user){
//    return res.status(400).json({status:"fail",msg:"user not found "})
//    }
// return res.status(200).json({status:"success",data:{user}})}
// catch(error){
// res.status(404).json({status:"error",msg:"error 404"}) 
// }}
const forgotpassword=async(req,res)=>{
  try{
const{email}=req.body
const emailcheck= await user.findOne({email:email})
   if(!emailcheck){
        return res.status(400).json({status:"fail",msg:"this email not exist"})
    }
const userotp = crypto.randomInt(100000, 999999).toString(); 
const hashotp=await bcrypt.hash(userotp,10)
await sendEmail({
to: email,
subject: "reset your password",
html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>Welcome, ${emailcheck.userName} 👋</h2>

    <p>Use the verification code below to reset your password on <strong>EDU</strong>.</p>

    <div style="
      background-color: #f4f4f4;
      padding: 15px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 5px;
      border-radius: 8px;
      margin: 20px 0;
    ">
      ${userotp}
    </div>

    <p>This code will expire in <strong>5 minutes</strong>.</p>

    <p>If you didn't request this code, you can safely ignore this email.</p>

    <hr style="margin: 20px 0;" />

    <p>Thank you for choosing EDUSITE.</p>
  </div>
`
});
emailcheck.resetpasswordotp=hashotp
emailcheck.expiredAt2=Date.now() +5*60*1000
await emailcheck.save()
res.status(200).json({status:"success"})
}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}}



module.exports={register,login,forgotpassword}