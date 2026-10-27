const express=require("express")
const Router =express.Router()

const coucecontroller=require("../controllers/cource")
const {verifytoken}=require("../middleware/jwt")
const allowto=require("../middleware/allowto")
const validate=require("../middleware/validation")
const validation=require("../validation/cource")
const upload =require("../middleware/images")

Router.post("/",verifytoken,allowto("Teacher","Admin"),validate(validation.createcourceSchema),upload.single("image"),coucecontroller.createcource)
Router.patch("/:id",verifytoken,allowto("Teacher","Admin"),validate(validation.updatecourceSchema,"body"),coucecontroller.updatecource)
Router.patch("/:id/publish",verifytoken,allowto("Teacher","Admin"),validate(validation.publishcourceSchema,"params"),coucecontroller.publishcource)
Router.get("/",verifytoken,allowto("Teacher","Admin"),coucecontroller.getcources)
Router.get("/cources",verifytoken,allowto("Teacher","Admin","Student"),coucecontroller.getAllPublishedCourses)
Router.get("/:id",verifytoken,allowto("Teacher","Admin"),validate(validation.getsinglecourceSchema,"params"),coucecontroller.getsinglecource)
Router.delete("/:id",verifytoken,validate(validation.deleteSchema,"params"),coucecontroller.deletecource)
module.exports= Router