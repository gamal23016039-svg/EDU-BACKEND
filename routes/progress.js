const express=require("express")
const Router =express.Router()
const progresscontrolle=require("../controllers/progress")
const {verifytoken}=require("../middleware/jwt")
const allowto=require("../middleware/allowto")
const validate=require("../middleware/validation")
const validation=require("../validation/progress")
Router.patch("/updateprogress/:id",verifytoken,allowto("Admin","Student"),validate(validation.updateLessonProgress,"params"),progresscontrolle.updateLessonProgress)
Router.get("/courceprogress/:id",verifytoken,allowto("Admin","Student"),validate(validation.getMyCoursesprogress,"params"),progresscontrolle.getMyCoursesprogress)

module.exports= Router