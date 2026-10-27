const Joi = require("joi")
    const enrollecource=Joi.object({
        id: Joi.string().required() 
    })
    const cancelEnrollment=Joi.object({
        id: Joi.string().required() 
    })
    const getCourseStudents=Joi.object({
        id: Joi.string().required() 
    })
      const checkEnrollment=Joi.object({
        id: Joi.string().required() 
    })
    module.exports={enrollecource,cancelEnrollment,getCourseStudents,checkEnrollment}







    