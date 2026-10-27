const Joi = require("joi")
    const getMyCoursesprogress=Joi.object({
        id: Joi.string().required() 
    })
    const updateLessonProgress=Joi.object({
        id: Joi.string().required() ,
        isCompleted:Joi.boolean().required()
    })
    module.exports={getMyCoursesprogress,updateLessonProgress}







    