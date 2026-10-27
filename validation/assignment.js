const Joi = require("joi")
const createassignmentSchema=Joi.object({
    courceId: Joi.string().required() ,
    title:Joi.string().required()
    ,description:Joi.string().required()
    ,dueDate:Joi.date().required()
})
const updateassignmentSchema=Joi.object({
   id: Joi.string().required() ,
   courceId: Joi.string().required() ,
    title:Joi.string().required()
    ,description:Joi.string().required()
    ,dueDate:Joi.date().required()
})
    const deleteassignmentSchema=Joi.object({
        id: Joi.string().required() 
    })
    const getsingleassignmentSchema=Joi.object({
        id: Joi.string().required() 
    })
    const getstudentassignmentSchema=Joi.object({
        id: Joi.string().required() 
    })
     const GetCourseAssignmentsSchema=Joi.object({
        id: Joi.string().required() 
    })
    module.exports={createassignmentSchema,updateassignmentSchema,deleteassignmentSchema,getsingleassignmentSchema,getstudentassignmentSchema,GetCourseAssignmentsSchema}