const users=require("../models/user")
const cources=require("../models/cource")
const lessons=require("../models/lesson")
const assignments=require("../models/assignment")
const Enrollments=require("../models/enrolle")
const { model } = require("mongoose")

const DashboardAdmin=async(req,res)=>{
const userscount = await users.countDocuments();

const studentscount = await users.countDocuments({role:"Student"});

const teacherscount = await users.countDocuments({role:"Teacher"});

const coursescount = await cources.countDocuments();

const lessonscount = await lessons.countDocuments();

   const assignmentscount = await assignments.countDocuments();

const enrollmentscount = await Enrollments.countDocuments();  

res.status(200).json({status:"success",msg:"successfully",data:{
studentscount,teacherscount,coursescount,lessonscount,userscount,enrollmentscount,assignmentscount}})
}
module.exports={DashboardAdmin}
