const { required } = require("joi")
const mongoose= require("mongoose")
const lessonSchema=new mongoose.Schema({
order:{
    type:Number,
    required:true
},
title:{
      type:String,
    required:true
},
description:{  
    type:String,
    required:true},
duration:{
      type:Number,
    required:true
},
isFree:{
      type:Boolean,
    required:true,
    default:false
},
videoUrl:{
      type:String
},
pdfUrl:{
    type:String,
    default:null
},
courceId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"cource",
    required:true
},
 },
 {
    timestamps: true,
  })
lessonSchema.index({
    courceId: 1,
    order: 1
});
module.exports=mongoose.model("lessons",lessonSchema)