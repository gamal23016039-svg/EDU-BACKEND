const express=require("express")
const Router =express.Router()
const submissioncontrolle=require("../controllers/Submissions")
const {verifytoken}=require("../middleware/jwt")
const allowto=require("../middleware/allowto")
const validate=require("../middleware/validation")
const validation=require("../validation/Submissions")
const upload =require("../middleware/images")

Router.post("/submit/:id",verifytoken,allowto("Admin","Student"),validate(validation.submissionSchema),
    upload.single("file"),submissioncontrolle.SubmitAssignment)
Router.patch("/Update/:id",verifytoken,allowto("Admin","Student"),validate(validation.updatesubmissionassignmentSchema,"params,body"),
    upload.single("file"),submissioncontrolle.updateSubmitAssignment)
Router.get("/submission/:id",verifytoken,allowto("Admin","Student"),validate(validation.getmysubmissionSchema,"params"),submissioncontrolle.GetMySubmission)
Router.get("/",verifytoken,allowto("Admin","Student"),submissioncontrolle.GetSubmissions)
Router.get("/:id/AssignmentSubmissions",verifytoken,allowto("Admin","Teacher"),validate(validation.GetAssignmentSubmissionsSchema,"params"),submissioncontrolle.GetAssignmentSubmissions)
Router.post("/grade/:id",verifytoken,allowto("Admin","Teacher"),validate(validation.GradeSubmissionSchema,"params,body"),submissioncontrolle.GradeSubmission)
Router.get("/:id",verifytoken,allowto("Admin","Teacher"),validate(validation.GetSingleSubmissionSchema,"params"),submissioncontrolle.GetSingleSubmission)

module.exports= Router