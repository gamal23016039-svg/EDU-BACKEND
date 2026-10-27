const enrollments=require("../models/enrolle")
const users= require("../models/user")
const cources= require("../models/cource")

const enrollecource=async(req,res)=>{
    const courceId=req.params.id
    const studentId=req.user.id
    const student = await users.findById(studentId)
     if(!student){
    return res.status(400).json({status:"fail",msg:"student not found "})
    }
    if(student.role!=="Student"){
    return res.status(400).json({status:"fail",msg:"not allowed "})
    }
    const cource = await cources.findById(courceId).populate("teacher")
    if(!cource){
    return res.status(400).json({status:"fail",msg:"this cource not found  "})
    }
    if(!cource.isPublished){
    return res.status(400).json({status:"fail",msg:"this cource not published  "})
    }
    const enrolle = await enrollments.findOne({studentId,courceId})
    if(enrolle){
    return res.status(400).json({status:"fail",msg:" your subscribe in this cource before "})
    }
    if (cource.price === 0) {
    const enrollment = new enrollments({
     studentId,
    courceId,
    paymentStatus: "free"
    });
    await enrollment.save();
     res.status(200).json({
        status: "success",
        msg: "You have successfully enrolled in this free course."
    });
await sendEmail({
    to: cource.teacher.email,
    subject: "New Student Enrollment",
    html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
            <h2>Welcome, ${cource.teacher.userName} 👋</h2>

            <p>
                A new student has enrolled in your course
                <strong>${cource.title}</strong>.
            </p>

            <p>
                Log in to your dashboard to view the new enrollment.
            </p>

            <br>

            <p>Thank you for using EDUSITE.</p>
        </div>
    `
});
} else {
    return res.status(200).json({
        status: "success",
        msg: "This course is paid. Please complete the payment first."
    });
}
}
const cancelEnrollment=async(req,res)=>{
    const courceId=req.params.id
    const studentId=req.user.id  
        const student = await users.findById(studentId)

         if(!student){
    return res.status(400).json({status:"fail",msg:"student not found "})
    }
    if(student.role!=="Student"){
    return res.status(400).json({status:"fail",msg:"not allowed "})
    }
     const cource = await cources.findById(courceId)
    if(!cource){
    return res.status(400).json({status:"fail",msg:"this cource not found  "})
    }
     const enrolle = await enrollments.findOne({studentId,courceId})
    if(!enrolle){
    return res.status(400).json({status:"fail",msg:" not found this enrollment  "})
    }
    await enrolle.deleteOne()
    res.status(200).json({status: "success",
    msg: "This Enrollment is cancelled "})

}
const getMyCourses = async(req,res)=>{
   const studentId=req.user.id 
       const student = await users.findById(studentId)
 
    if(!student){
    return res.status(400).json({status:"fail",msg:"student not found "})
    }
    if(student.role!=="Student"){
    return res.status(400).json({status:"fail",msg:"not allowed "})
    }
    const enrolle = await enrollments.find({studentId}).populate('courceId')
    if(enrolle.length===0){
    return res.status(400).json({status:"fail",msg:" not found any cources  "})
    }
    res.status(200).json({status: "success",
    data:{enrolle}})
}
const getCourseStudents=async(req,res)=>{
 const courceId=req.params.id
 const teacherId=req.user.id 
 const cource = await cources.findOne({_id:courceId,teacher:teacherId})
if(!cource){
    return res.status(400).json({status:"fail",msg:"this cource not found  "})
    }
const enrolle = await enrollments.find({courceId}).populate({path:'studentId',select:"firstName lastName email"})
 if(enrolle.length==0){
    return res.status(400).json({status:"fail",msg:" not found any students "})
    }
    res.status(200).json({status: "success",
    data:{enrolle}})  
}
const checkEnrollment=async(req,res)=>{
    const courceId=req.params.id
    const studentId=req.user.id 
    const enrolle = await enrollments.findOne({studentId,courceId})
    if(enrolle){
    return res.status(200).json({status:"success",msg:" You are enrolled in this course. "})
    }
     res.status(400).json({status: "fail",
        msg:" You are not enrolled in this course."
    })  
}
module.exports={getCourseStudents,checkEnrollment,enrollecource,cancelEnrollment,getMyCourses}