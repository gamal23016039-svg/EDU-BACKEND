const express=require("express")
const Router =express.Router()
const upload =require("../middleware/images")

const lessoncontroller=require("../controllers/lesson")
const {verifytoken}=require("../middleware/jwt")
const allowto=require("../middleware/allowto")
const validate=require("../middleware/validation")
const validation=require("../validation/lesson")
Router.post("/",verifytoken,allowto("Teacher","Admin"),validate(validation.createlessonSchema),lessoncontroller.createlesson)
Router.patch("/:id",verifytoken,allowto("Teacher","Admin"),validate(validation.updatelessonSchema,"body"),lessoncontroller.updatelesson)
Router.get("/cources/:courceId",verifytoken,allowto("Teacher","Admin"),lessoncontroller.getalllessons)
Router.get("/:id",verifytoken,allowto("Teacher","Admin"),validate(validation.getsinglelessonSchema,"params"),lessoncontroller.getsinglelessons)
Router.delete("/:id",verifytoken,allowto("Teacher","Admin"),validate(validation.deleteSchema,"params"),lessoncontroller.deletelesson)
Router.patch(
    "/:id/video",
    verifytoken,
    allowto("Teacher"),
    validate(validation.uploadVideoSchema, "params"),
    upload.single("video"),
    lessoncontroller.uploadLessonVideo
);
Router.patch(
    "/:id/pdf",
    verifytoken,
    allowto("Teacher"),
    validate(validation.uploadpdfSchema, "params"),
    upload.single("pdf"),
    lessoncontroller.uploadLessonpdf
);
Router.get(
    "/:id/lesson",
    verifytoken,
    allowto("Student"),
    validate(validation.studentshowlessonSchema, "params"),
    lessoncontroller.studentshowlesson
);
Router.get(
    "/:id/cource",
    verifytoken,
    allowto("Student"),
    validate(validation.studentshowlessonsSchema, "params"),
    lessoncontroller.studentshowlessons
);
module.exports= Router