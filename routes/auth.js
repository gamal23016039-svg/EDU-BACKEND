const express=require("express")
const limiter=require("../middleware/ratelimiter")
const Router =express.Router()
const authcontroller=require("../controllers/auth")
const verifyemail=require("../controllers/verifyemail")
const {verifytoken}=require("../middleware/jwt")
const allowto=require("../middleware/allowto")
const validate=require("../middleware/validation")
const validation=require("../validation/user")
Router.post("/register",validate(validation.registerSchema),authcontroller.register)
Router.post("/login",limiter,validate(validation.loginSchema),authcontroller.login)
Router.post("/verifyemail",validate(validation.verifyemailSchema),verifyemail.verifyemail)
Router.post("/forgot-password",limiter,validate(validation.resetpasswordSchema),authcontroller.forgotpassword)
Router.post("/resetpass",limiter,validate(validation.resetpassword),verifyemail.resetpassword)


module.exports= Router