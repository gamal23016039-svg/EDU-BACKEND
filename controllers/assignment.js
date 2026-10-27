const assignments =require("../models/assignment")
const cources= require("../models/cource")
const enrolments = require("../models/enrolle")

const createassignment =async(req,res)=>{
  try
{
const{courceId,title,description,dueDate}=req.body
const teacherId=req.user.id
const cource =await cources.findById(courceId)
    if(!cource){
   return res.status(400).json({status:"fail",msg:"cource not found "})
}
if(cource.teacher.toString() !== teacherId){
  return res.status(403).json({status:"fail",msg:"Unauthorized teacher "})
}
if(!cource.isPublished){
    return res.status(403).json({status:"fail",msg:"cource not published  "})
}
if(new Date(dueDate) <= new Date()){
   return res.status(400).json({status:"fail",msg:"dueDate not allow"})
}
const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
const assignment= await new assignments({
  courceId,teacherId,title,description,fileUrl,dueDate
})
await assignment.save()
return res.status(200).json({status:"success",msg:"Assignment created successfully",data:{assignment}})
}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const Updateassighnment =async(req,res)=>{
const teacherId=req.user.id
const assignmentId=req.params.id
const{courceId,title,description,dueDate}=req.body
const assignment =await assignments.findOne({teacherId,_id:assignmentId})
    if(!assignment){
   return res.status(400).json({status:"fail",msg:" this assignment not found "})
}
if(assignment.teacherId.toString() !== teacherId){
  return res.status(403).json({status:"fail",msg:"Unauthorized teacher "})
}
if (title) {
    assignment.title = title;
}

if (description) {
    assignment.description = description;
}

if (dueDate) {
    assignment.dueDate = dueDate;
}
await assignment.save()
return res.status(200).json({status:"success",msg:"Assignment updated successfully",data:{assignment}})
}
const deleteassighnment =async(req,res)=>{
const teacherId=req.user.id
const assignmentId=req.params.id
const assignment =await assignments.findOne({teacherId,_id:assignmentId})
    if(!assignment){
   return res.status(400).json({status:"fail",msg:" this assignment not found "})
}
await assignment.deleteOne()
return res.status(200).json({status:"success",msg:"Assignment deleted successfully"})
}
const GetCourseAssignments=async(req,res)=>{
  const teacherId=req.user.id
const courceId=req.params.id
const assignment =await assignments.find({teacherId,courceId})
    if(assignment.length===0){
   return res.status(400).json({status:"fail",msg:" this assignment not found "})
}
return res.status(200).json({status:"success",msg:"successfully",data:{assignment}})
}
const GetSingleAssignments=async(req,res)=>{
  const teacherId=req.user.id
const assignmentId=req.params.id
const assignment =await assignments.find({teacherId,_id:assignmentId})
    if(assignment.length===0){
   return res.status(400).json({status:"fail",msg:" this assignment not found "})
}
return res.status(200).json({status:"success",msg:"successfully",data:{assignment}})
}
//student
const getstudentassignment=async(req,res)=>{
  try{
const studentId=req.user.id
const courceId = req.params.id
const cource =await cources.findById({_id:courceId})
if(!cource){
  return res.status(400).json({status:"fail",msg:"  not found this cource  "})
}
const enrolle=await enrolments.findOne({studentId,courceId})
if(!enrolle){
  return res.status(400).json({status:"fail",msg:"  this student not enrolle in this cource  "})
}
const assignment =await assignments.find({courceId}).sort({dueDate:1})
if(assignment.length===0){
  return res.status(400).json({status:"fail",msg:"  not found any assignment  "})
}
return res.status(200).json({status:"success",msg:"Assignments fetched successfully ",data:{assignment}})
}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
module.exports={createassignment,Updateassighnment,getstudentassignment,GetSingleAssignments,GetCourseAssignments,deleteassighnment}