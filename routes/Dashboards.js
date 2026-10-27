const express=require("express")
const Router =express.Router()
const Dashboardstudentcontroller=require("../controllers/Dashboardstudent")
const dashboardadmincontroller=require("../controllers/DashboardAdmin")
const Dashboardteachercontroller=require("../controllers/Dashboardteacher")

const {verifytoken}=require("../middleware/jwt")
const allowto=require("../middleware/allowto")

Router.get("/Dashboardstudent",verifytoken,allowto("Student"),Dashboardstudentcontroller.Dashboardstudent)
Router.get("/DashboardAdmin",verifytoken,allowto("Admin"),dashboardadmincontroller.DashboardAdmin)
Router.get("/Dashboardteacher",verifytoken,allowto("Teacher"),Dashboardteachercontroller.Dashboardteacher)

module.exports=Router