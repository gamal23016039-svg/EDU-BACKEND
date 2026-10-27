const Joi = require("joi")
const submissionSchema=Joi.object({
    id: Joi.string().required()
    ,answer:Joi.string().required()
    ,fileUrl:Joi.string().required()
})
const updatesubmissionassignmentSchema=Joi.object({
    id: Joi.string().required()
    ,answer:Joi.string().required()
    ,fileUrl:Joi.string().required()
})
    const GetSingleSubmissionSchema=Joi.object({
        id: Joi.string().required() 
    })
    const getmysubmissionSchema=Joi.object({
        id: Joi.string().required() 
    })
    const GetAssignmentSubmissionsSchema=Joi.object({
        id: Joi.string().required() 
    })
     const GradeSubmissionSchema=Joi.object({
        id: Joi.string().required() ,
        grade:Joi.number().required()
      ,feedback:Joi.string().required()
    })
    module.exports={submissionSchema,updatesubmissionassignmentSchema,GetSingleSubmissionSchema,getmysubmissionSchema,GetAssignmentSubmissionsSchema,GradeSubmissionSchema
}