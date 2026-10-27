const users=require("../models/user")
const cources=require("../models/cource")
const lessons=require("../models/lesson")
const assignments=require("../models/assignment")
const Enrollments=require("../models/enrolle")
const { model } = require("mongoose")

const Dashboardteacher=async(req,res)=>{
const teacherId=req.user.id

const coursescount = await cources.countDocuments({teacher:teacherId});
const teacherCourses = await cources.find({
    teacher: teacherId
});
const courseIds = teacherCourses.map(course => course._id);
const studentscount = await Enrollments.countDocuments({
    courceId: { $in: courseIds }
});
const lessonscount = await lessons.countDocuments({
    courceId: { $in: courseIds }
});
const assignmentscount = await assignments.countDocuments({teacherId});

res.status(200).json({status:"success",msg:"successfully",data:{
studentscount,teacherCourses,coursescount,lessonscount,assignmentscount}})
}
module.exports={Dashboardteacher}
