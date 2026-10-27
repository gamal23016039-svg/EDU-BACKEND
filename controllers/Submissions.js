const Submissions= require("../models/Submissions")
const assignments= require("../models/assignment")
const cources= require("../models/cource")
const enrolments = require("../models/enrolle")

const SubmitAssignment= async(req,res)=>{
    const studentId=req.user.id
    const assignmentId=req.params.id
    const {answer}= req.body
    const assignment =await assignments.findById(assignmentId)
    if(!assignment){
    return res.status(400).json({status:"fail",msg:" this assignment not found "})
    }
      const cource =await cources.findById(assignment.courceId)
    if(!cource){
      return res.status(400).json({status:"fail",msg:"  not found this cource  "})
    }
    const enrolle=await enrolments.findOne({studentId,courceId:assignment.courceId})
    if(!enrolle){
      return res.status(400).json({status:"fail",msg:"  this student not enrolle in this cource  "})
    }
     const submission =await Submissions.findOne({assignmentId,studentId})
    if(submission){
    return res.status(400).json({status:"fail",msg:" this submission exist already "})
    }
const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
const Submission= new Submissions({
  studentId,assignmentId,answer,fileUrl,status:"submitted"
})
if(new Date(assignment.dueDate) <= new Date()){
    Submission.status="late"
}
await Submission.save()
return res.status(200).json({status:"success",msg:"Assignment submited successfully",data:{Submission}})
}
const updateSubmitAssignment= async(req,res)=>{
    const studentId=req.user.id
    const assignmentId=req.params.id
    const {answer}= req.body
    const assignment =await assignments.findById(assignmentId)
    if(!assignment){
    return res.status(400).json({status:"fail",msg:" this assignment not found "})
    }
      const cource =await cources.findById(assignment.courceId)
    if(!cource){
      return res.status(400).json({status:"fail",msg:"  not found this cource  "})
    }
    const enrolle=await enrolments.findOne({studentId,courceId: assignment.courceId})
    if(!enrolle){
      return res.status(400).json({status:"fail",msg:"  this student not enrolle in this cource  "})
    }
     const submission =await Submissions.findOne({assignmentId,studentId})
    if(!submission){
    return res.status(400).json({status:"fail",msg:" this submission not exist "})
    }
    if(new Date(assignment.dueDate) <= new Date()){
     return res.status(400).json({status:"fail",msg:"update not allow"})
    }
const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
if (answer) {
    submission.answer = answer;
}
if (fileUrl) {
    submission.fileUrl = fileUrl;
}
await submission.save()
return res.status(200).json({status:"success",msg:"submission updated successfully"})
}

const GetMySubmission=async(req,res)=>{
const studentId=req.user.id
const assignmentId=req.params.id
const assignment=await assignments.findById(assignmentId)
if(!assignment){
  return res.status(400).json({status:"fail",msg:" this assignment not found "})
  }
const submission=await Submissions.findOne({studentId,assignmentId})
if(!submission){
  return res.status(400).json({status:"fail",msg:" this submission not found "})
  }
 return res.status(200).json({status:"success",msg:"successfully",data:{submission}})
}
const GetSubmissions=async(req,res)=>{
const studentId=req.user.id
const submission=await Submissions.find({studentId}).populate("assignmentId")
if(submission.length===0){
  return res.status(400).json({status:"fail",msg:" not found any submission "})
  }
 return res.status(200).json({status:"success",msg:"successfully",data:{submission}})
}
const GetAssignmentSubmissions=async(req,res)=>{
  const teacherId=req.user.id
  const assignmentId=req.params.id
  console.log("assignmentId:", assignmentId);
console.log("teacherId:", teacherId);
  const assignment=await assignments.findOne({_id:assignmentId,teacherId:teacherId})
if(!assignment){
  return res.status(400).json({status:"fail",msg:" this assignment not found "})
  }
const submission=await Submissions.find({assignmentId}).populate("studentId", "firstName lastName email image")
if(submission.length===0){
  return res.status(400).json({status:"fail",msg:" not found any submissions"})
  }
   return res.status(200).json({status:"success",msg:"successfully",data:{submission}})
}
const GradeSubmission=async(req,res)=>{
const {grade,feedback}=req.body
const submissionId=req.params.id
const submission=await Submissions.findOne({_id:submissionId})
if(!submission){
  return res.status(400).json({status:"fail",msg:" not found this submission"})
  }
  const assignment = await assignments.findOne({
    _id: submission.assignmentId,
    teacherId: req.user.id
});
if(!assignment){
    return res.status(400).json({status:"fail",msg:" Unauthorized "})
}
submission.status="graded"
submission.grade=grade
submission.feedback=feedback
await submission.save()
return res.status(200).json({status:"success",msg:"submission graded successfully",data:{submission}})
}
const GetSingleSubmission=async(req,res)=>{
const teacherId=req.user.id
const submissionId=req.params.id
const submission=await Submissions.findById(submissionId).populate("studentId", "firstName lastName email image")
    .populate("assignmentId", "title dueDate");
if(!submission){
  return res.status(400).json({status:"fail",msg:" not found this submission"})
  }
    const assignment = await assignments.findOne({
    _id: submission.assignmentId,
    teacherId: req.user.id
});
if(!assignment){
    return res.status(400).json({status:"fail",msg:" Unauthorized "})
}
return res.status(200).json({status:"success",msg:"submission fetched successfully",data:{submission}})
}


module.exports={SubmitAssignment,
  updateSubmitAssignment,
  GetMySubmission,
  GetSubmissions,
  GetAssignmentSubmissions,
  GradeSubmission,
  GetSingleSubmission
}