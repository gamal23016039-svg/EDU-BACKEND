const mongoose= require("mongoose")
const { type } = require("node:os")
const progressSchema=new mongoose.Schema({
        studentId:{
            type:mongoose.Schema.Types.ObjectId
        },
        courceId:{
        type:mongoose.Schema.Types.ObjectId  
        },
         lessonId:{
        type:mongoose.Schema.Types.ObjectId  
        },
        isCompleted:{
            type:Boolean,
            default:false
        },
        completedAt:{
            type:Date
        }
})
module.exports=mongoose.model('progresses',progressSchema)