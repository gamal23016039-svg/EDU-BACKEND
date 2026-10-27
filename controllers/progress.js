const progresses=require("../models/progress")
const lessons =require("../models/lesson")
const cources= require("../models/cource")
const enrollments= require("../models/enrolle")

const updateLessonProgress = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const studentId = req.user.id;
    const { isCompleted } = req.body;
    const lesson = await lessons.findById(lessonId).populate("course");
    if (!lesson) {
      return res.status(404).json({
        status: "fail",
        msg: "Lesson not found",
      });
    }
    const enrollment = await enrollments.findOne({
     studentId,
      course: lesson.course._id,
    });
    if (!enrollment) {
      return res.status(403).json({
        status: "fail",
        msg: "You are not enrolled in this course",
      });
    }
    let progress = await progresses.findOne({
       studentId,
       lessonId,
    });
    if (progress) {
      progress.isCompleted = isCompleted;
      progress.completedAt = isCompleted ? new Date() : null;
      await progress.save();
      return res.status(200).json({
        status: "success",
        msg: "Lesson progress updated successfully",
        data: { progress },
      });
    }
    progress = new progresses({
      student: studentId,
      course: lesson.course._id,
      lesson: lessonId,
      isCompleted,
      completedAt: isCompleted ? new Date() : null,
    });
    await progress.save();
    return res.status(201).json({
      status: "success",
      msg: "Lesson progress created successfully",
      data: { progress },
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
    });
  }
};

// const markLessonComplete=async(req,res)=>{
//     const lessonId=req.params.lessonId
//     const studentId=req.user.id
//     const iscompleated=req.body
//     const lesson = await lessons.findById(lessonId).populate('cource')
//     if(!lesson){
//     return res.status(400).json({status:"fail",msg:"this lesson not found "})
//     }
//      const enrolle = await enrollments.findById(studentId)
//      if(!enrolle.paymentStatus=="paid"||"free"){
//     return res.status(400).json({status:"fail",msg:"this student  not enrolled "})
//     }
//     const progress = await progresses.findOne({lessonId,studentId})
//     if(progress){
//      progress.iscompleated=iscompleated
//      progress.save()
//      return res.status(400).json({status:"fail",msg:"this progress is exist "})
//     }
//     const progresss= new progresses({
//         studentId,courceId:lesson.cource_id,lessonId,iscompleated:true,createdAt:Date.now()
//     })
//     await progress.save()
//      res.status(200).json({
//         status: "success",
//         msg: "This lesson is completed"
//     });
// }
const getMyCoursesprogress = async(req,res)=>{
   const studentId=req.user.id 
    const courceId = req.params.courceId;
    const student = await users.findById(studentId)
    if(!student){
    return res.status(400).json({status:"fail",msg:"student not found "})
    }
    if(student.role!=="Student"){
    return res.status(400).json({status:"fail",msg:"not allowed "})
    }
    const progress = await progresses.find({studentId,courceId})
    if(!progress.length==0){
    return res.status(400).json({status:"fail",msg:" not found any progress  "})
    }
    const totallessons= await lessons.countDocuments(courceId);
    let totalprogresscomplete=0
    let totalprogressnotcomplete=0
    for(let i=0;i<=progress.length;i++){
        if(progress[i].isCompleted==true){
         totalprogresscomplete+=1
         const percentage = (totalprogresscomplete / totalLessons) * 100;
        }
        else{
           totalprogressnotcomplete+=1 
        }
    }
    res.status(200).json({status: "success",
    data:{totalprogress,totalprogresscomplete,totalprogressnotcomplete}})
}
module.exports={getMyCoursesprogress,updateLessonProgress}