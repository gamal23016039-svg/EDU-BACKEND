const express=require("express")
const Router =express.Router()

const usercontroller=require("../controllers/user")
const verifyemail=require("../controllers/verifyemail")
const {verifytoken}=require("../middleware/jwt")
const allowto=require("../middleware/allowto")
const validate=require("../middleware/validation")
const validation=require("../validation/user")
const upload =require("../middleware/images")

Router.get("/profile",verifytoken,usercontroller.getuserinformation)
Router.patch("/profile",verifytoken,validate(validation.updateinformationSchema),usercontroller.updateinformation)
Router.patch("/change-password",verifytoken,validate(validation.changepasswordSchema),usercontroller.changepassword)
Router.delete("/profile",verifytoken,validate(validation.deleteSchema),usercontroller.deleteaccount)
Router.get("/:id",verifytoken,allowto("Admin"),validate(validation.getuserSchema,"params"),usercontroller.getsingleuser)
Router.delete("/:id",verifytoken,allowto("Admin"),validate(validation.deleteSchema,"params"),usercontroller.deleteuser)
Router.get("/",verifytoken,allowto("Admin"),usercontroller.getalluser)
// Router.get("/",verifytoken,allowto("Admin"),usercontroller.getalluser)
Router.post("/addphoto",verifytoken,allowto("Student","Teacher","Admin"),upload.single("image"),usercontroller.addprofilephoto)

module.exports= Router
