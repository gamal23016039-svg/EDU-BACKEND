
const express=require("express")
const Router =express.Router()

const Enrollmentcodecontroller=require("../controllers/Enrollmentcode")
const {verifytoken}=require("../middleware/jwt")
const allowto=require("../middleware/allowto")



Router.post(
    "/generate",
    verifytoken,
    allowto("Admin"),
    Enrollmentcodecontroller.generateEnrollmentCodes
);

Router.post(
    "/redeemcode",
    verifytoken,
    allowto("Student"),
    Enrollmentcodecontroller.redeemCode
);
module.exports=Router