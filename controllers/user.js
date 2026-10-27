// const user = require("../models/user")
const users= require("../models/user")
const bcrypt=require("bcrypt")

const getuserinformation=async (req,res)=>{
try{
    const userId=req.user.id
const user=await users.findById(userId)
if(!user){
 return res.status(400).json({status:"fail",data:null})
}
 res.status(200).json({status:"success",data:{firstName:user.firstName,lastName:user.lastName,userName:user.userName,email:user.email}})
}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}}
const updateinformation = async(req,res)=>{
try{
const userId=req.user.id
const{firstName,lastName,userName,email} =req.body
const user=await users.findById(userId)
if(!user){
 return res.status(400).json({status:"fail",msg:"user not found "})
}
user.firstName=firstName,
user.lastName=lastName,
user.userName=userName,
user.email=email
await user.save()
res.status(200).json({status:"success",data:{user}})
}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const changepassword=async(req,res)=>{
try{
const userId=req.user.id
const {oldpassword,newpassword}=req.body
const user=await users.findById(userId).select("+password")
if(!user){
 return res.status(400).json({status:"fail",msg:"user not found "})
}
console.log(req.body);
const checkoldpassword= await bcrypt.compare(oldpassword,user.password)
if(!checkoldpassword){
return res.status(400).json({status:"fail",msg:"the old passsword is wrong "})
}
const hashnewpassword= await bcrypt.hash(newpassword,10)
user.password=hashnewpassword
await user.save()
res.status(200).json({status:"success",msg:"the password is changed successfully "})}
catch(error){
  res.status(404).json({status:"error",msg:"error 404"}) 
  
}
}
const deleteaccount=async(req,res)=>{
try{
const userId=req.user.id
const user=await users.findByIdAndDelete(userId)
if(!user){
 return res.status(400).json({status:"fail",msg:"user not found "})
}
res.status(200).json({status:"success",msg:"your account delete successfully"})}
catch(error){
  res.status(404).json({status:"error",msg:"error 404"}) 
  
}
}
const getalluser=async(req,res)=>{
try{   
    const user = await users.find({}) 
   if(!user){
   return res.status(400).json({status:"fail",data:null})
   }
return res.status(200).json({status:"success",data:{user}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}}
const getsingleuser=async(req,res)=>{
try{   
    const userId=req.params.id
const user = await users.findById(userId) 
   if(!user){
   return res.status(400).json({status:"fail",msg:"user not found "})
   }
return res.status(200).json({status:"success",data:{user}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
} 

const deleteuser=async(req,res)=>{
try{   
const userId=req.params.id
const user = await users.findByIdAndDelete(userId) 
   if(!user){
   return res.status(400).json({status:"fail",msg:"user not found "})
   }
return res.status(200).json({status:"success",data:{user}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}}
const addprofilephoto=async(req,res)=>{
  const user= await users.findById(req.user.id)
  if(!user){
       return res.status(400).json({status:"fail",msg:"user not found "})
  }
if(!req.file ){
       return res.status(400).json({status:"fail",msg:"Please upload an image "})
}
const image = req.file ? `/uploads/${req.file.filename}` : null;
user.image=image
await user.save()
return res.status(200).json({
    status: "success",
    msg: "Profile photo updated successfully",
    data: {
        image: user.image
    }
});
}

module.exports={getuserinformation,updateinformation,changepassword,deleteaccount,getalluser,getsingleuser,deleteuser,addprofilephoto}
