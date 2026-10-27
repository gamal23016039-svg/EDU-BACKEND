const cources = require("../models/cource")
// const lesson = require("../models/lesson")
const enrollments=require("../models/enrolle")
const lessons=require("../models/lesson")

const createlesson = async(req,res)=>{
try{
const teacherId=req.user.id
const {order,title,description,duration,isFree,courceId}=req.body
const cource =await cources.findOne({_id:courceId,teacher:teacherId})
if(!cource){
return res.status(400).json({status:"fail",msg:" not found this cource "})
}
const lesson =await lessons.findOne({cource:courceId,order})
if(lesson){
return res.status(400).json({status:"fail",msg:" this lesson order or lesson already exist "})
}
const newlesson= new lessons({
  order,title,description,duration,isFree,courceId  
})
await newlesson.save()
cource.lessonsCount+=1
await cource.save()
return res.status(200).json({status:"success",msg:" this lesson added successfully",data:{newlesson}})
}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const updatelesson= async(req,res)=>{
try{   
const teacherId=req.user.id
const lessonId=req.params.id
const {order,title,description,duration,isFree,courceId}=req.body
const cource =await cources.findOne({_id:courceId,teacher:teacherId})
if(!cource){
return res.status(400).json({status:"fail",msg:" not found this cource "})
}
const lesson = await lessons.findOne({
    _id: lessonId,
    courceId: courceId
})
if(!lesson){
return res.status(400).json({status:"fail",msg:" this lesson not exist "})
} 
lesson.title=title,lesson.description=description,lesson.duration=duration,lesson.isFree=isFree
await lesson.save()
return res.status(200).json({status:"success",msg:" this lesson updated successfully",data:{lesson}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const getalllessons=async(req,res)=>{
try{
const teacherId=req.user.id
const courceId=req.params.courceId
const cource =await cources.findOne({_id:courceId,teacher:teacherId})
if(!cource){
return res.status(400).json({status:"fail",msg:" not found this cource "})
}
const lesson = await lessons.find({courceId:courceId})
if(lesson.length===0){
return res.status(400).json({status:"fail",msg:" not found lessons "})
}
res.status(200).json({status:"success",data:{lesson}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const getsinglelessons=async(req,res)=>{
try{
const lessonId=req.params.id
const lesson = await lessons.findById(lessonId).populate("courceId");
if(!lesson){
    return res.status(400).json({status:"fail",msg:" this lesson not found "})
    }
if (lesson.courceId.teacher.toString() !== req.user.id) {
    return res.status(403).json({
        status: "fail",
        msg: "Unauthorized"
    });
}
res.status(200).json({status:"success",data:{lesson}})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const deletelesson=async(req,res)=>{
try{   
    const lessonId=req.params.id
const lesson = await lessons.findById(lessonId).populate("courceId");
if(!lesson){
    return res.status(400).json({status:"fail",msg:" this lesson not found "})
    }
if (lesson.courceId.teacher.toString() !== req.user.id) {
    return res.status(403).json({
        status: "fail",
        msg: "Unauthorized"
    })}
await lesson.deleteOne()
lesson.courceId.lessonsCount-=1
await cource.save()
res.status(200).json({status:"success",msg:"lesson deleted successfully"})}
catch(error){
res.status(404).json({status:"error",msg:"error 404"}) 
}
}
const uploadLessonVideo=async(req,res)=>{
const teacherId=req.user.id
const lessonId=req.params.id
const lesson=await lessons.findById(lessonId)
if(!lesson){
    return res.status(400).json({status:"fail",msg:" this lesson not found "})
    }
const cource =await cources.findOne({_id:lesson.courceId,teacher:teacherId})
if(!cource){
    return res.status(400).json({status:"fail",msg:" this cource not found or teacher unutharized "})
    }
    if(!req.file){
    return res.status(400).json({status:"fail",msg:"Please upload a video "})
}
const videoUrl= `/uploads/videos/${req.file.filename}`;
lesson.videoUrl=videoUrl
await lesson.save()
res.status(200).json({status:"success",msg:"video uploaded successfully",data:lesson})}

const uploadLessonpdf=async(req,res)=>{
const teacherId=req.user.id
const lessonId=req.params.id
const lesson=await lessons.findById(lessonId)
if(!lesson){
    return res.status(400).json({status:"fail",msg:" this lesson not found "})
    }
const cource =await cources.findOne({_id:lesson.courceId,teacher:teacherId})
if(!cource){
    return res.status(400).json({status:"fail",msg:" this cource not found or teacher unutharized "})
    }
    if(!req.file){
    return res.status(400).json({status:"fail",msg:"Please upload a pdf "})
}
const pdfUrl= `/uploads/pdfs/${req.file.filename}`;
lesson.pdfUrl=pdfUrl
await lesson.save()
res.status(200).json({status:"success",msg:"pdf uploaded successfully",data:lesson})}

const studentshowlesson=async(req,res)=>{
const studentId=req.user.id
const lessonId=req.params.id
const lesson=await lessons.findById(lessonId)
if(!lesson){
    return res.status(400).json({status:"fail",msg:" this lesson not found "})
    }
if(lesson.isFree==true){
return res.status(200).json({status:"success",data:lesson})
}
const enrolle=await enrollments.findOne({studentId,courceId:lesson.courceId})
if(!enrolle){
return res.status(400).json({status:"fail",msg:" this student not enrolle"})
}
res.status(200).json({status:"success",msg:"successfully",data:lesson})}

const studentshowlessons=async(req,res)=>{
const studentId=req.user.id
const courceId=req.params.id
const cource=await cources.findById(courceId)
if(!cource){
    return res.status(400).json({status:"fail",msg:" this cource not found "})
    }
const enrolle=await enrollments.findOne({studentId,courceId:courceId})
if(!enrolle){
return res.status(400).json({status:"fail",msg:" this student not enrolle"})
}
const lessons=await lessons.find({courceId}).sort({order:1})
if(lessons.length==0){
return res.status(200).json({
    status: "success",
    data: {
        lessons: []
    }
});    }
res.status(200).json({status:"success",msg:"successfully",data:{lessons}})}


module.exports={createlesson,updatelesson,getalllessons,getsinglelessons,deletelesson,uploadLessonVideo,uploadLessonpdf,studentshowlesson,studentshowlessons}
