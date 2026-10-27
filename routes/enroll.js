const express=require("express")
const Router =express.Router()
const enrollecontrolle=require("../controllers/enrollment")
const {verifytoken}=require("../middleware/jwt")
const allowto=require("../middleware/allowto")
const validate=require("../middleware/validation")
const validation=require("../validation/enrolle")
Router.post("/:id",verifytoken,validate(validation.enrollecource,"params"),enrollecontrolle.enrollecource)
Router.delete("/:id/enroll",verifytoken,validate(validation.cancelEnrollment,"params"),enrollecontrolle.cancelEnrollment)
Router.get("/my-courses",verifytoken,enrollecontrolle.getMyCourses)
Router.post("/:id/check-enrollment",verifytoken,validate(validation.checkEnrollment,"params"),enrollecontrolle.checkEnrollment)
Router.get("/:id/students",verifytoken,allowto("Admin","Teacher"),validate(validation.getCourseStudents,"params"),enrollecontrolle.getCourseStudents)

module.exports= Router