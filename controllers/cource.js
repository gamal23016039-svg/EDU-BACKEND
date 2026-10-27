const { title } = require("node:process")
const cources=require("../models/cource")
const users =require("../models/user")

const createcource=async(req,res)=>{
try{
    const teacherId=req.user.id
const teacher = await users.findById(teacherId)
if(!teacher || teacher.role!=="Teacher"){
return res.status(400).json({status:"fail",msg:" this operation not allow "})
}
const {title,description,price}=req.body
// if(!req.file ){
//        return res.status(400).json({status:"fail",msg:"Please upload an image "})
//   }
const image = req.file ? `/uploads/${req.file.filename}` : null;
const cource= new cources({
title,description,price,teacher:teacherId,image
})
await cource.save()
res.status(200).json({status:"success",msg:"cource created successfully",data:{cource}})
}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const updatecource= async(req,res)=>{
try{   
    const teacherId=req.user.id
    const courceId=req.params.id
    const{title,description,price} =req.body
    const cource = await cources.findOne({_id:courceId,teacher:teacherId})
    if(!cource){
    return res.status(400).json({status:"fail",msg:" this cource not found "})
    }
    cource.title=title
    cource.description=description
    cource.price=price
    await cource.save()
    res.status(200).json({status:"success",msg:"cource updated",data:{cource}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const deletecource=async(req,res)=>{
try{   
    const teacherId=req.user.id
    const courceId=req.params.id
    const cource = await cources.findOne({_id:courceId,teacher:teacherId})
    if(!cource){
    return res.status(400).json({status:"fail",msg:" this cource not found "})
    }
await cource.deleteOne()
res.status(200).json({status:"success",msg:"cource deleted successfully"})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const getcources=async(req,res)=>{
try{
const teacherId=req.user.id
const cource = await cources.find({teacher:teacherId})
if(cource.length==0){
return res.status(400).json({status:"fail",msg:" not found cources "})
}
res.status(200).json({status:"success",data:{cource}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const getsinglecource=async(req,res)=>{
try{
const teacherId=req.user.id
const courceId=req.params.id
const cource = await cources.findOne({_id:courceId,teacher:teacherId})
if(!cource){
return res.status(400).json({status:"fail",msg:" not found cource "})
}
res.status(200).json({status:"success",data:{cource}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const publishcource=async(req,res)=>{
try{
const teacherId=req.user.id
const courceId=req.params.id 
const cource = await cources.findOne({_id:courceId,teacher:teacherId})
if(!cource){
return res.status(400).json({status:"fail",msg:" not found cource "})
}
if(lessoncount==0){
return res.status(400).json({status:"fail",msg:" cource must contain at least one cource"})
}
cource.isPublished=true
await cource.save()
res.status(200).json({status:"success",msg:"cource published successfully"})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const getAllPublishedCourses=async(req,res)=>{
try{
const {search}=req.query
let filter = {
   isPublished:true
};
if (search) {
    filter.title = {
        $regex: search,
        $options: "i"
    };
}
const cource = await cources.find(filter)
if(cource.length==0){
return res.status(400).json({status:"fail",msg:" not found cources "})
}
res.status(200).json({status:"success",data:{cource}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
} 
}

module.exports={getAllPublishedCourses,createcource,updatecource,deletecource,getcources,getsinglecource,publishcource}
