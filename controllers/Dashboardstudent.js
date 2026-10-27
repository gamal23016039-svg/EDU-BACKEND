const users=require("../models/user")
const cources=require("../models/cource")
const lessons=require("../models/lesson")
const assignments=require("../models/assignment")
const Enrollments=require("../models/enrolle")
const { model } = require("mongoose")
const submissions=require("../models/Submissions")
const enrolle = require("../models/enrolle")
const Dashboardstudent=async(req,res)=>{              
const studentId=req.user.id

const coursescount= await Enrollments.countDocuments({studentId})
const courceIds= Enrollments.map(enrolle=>enrolle.courceId)
const lessonscount= await Enrollments.countDocuments({courceId:{$in:courceIds}})
const assignmentcount=await assignments.countDocuments({courceId:{$in:courceIds}})
const submissioncount=await submissions.countDocuments({studentId})

const pendingAssignments =assignmentcount-submissioncount

res.status(200).json({status:"success",msg:"successfully",data:{
coursescount,lessonscount,assignmentcount,submissioncount,pendingAssignments}})
}

module.exports={Dashboardstudent}