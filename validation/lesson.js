const Joi = require("joi")
const createlessonSchema=Joi.object({
    order:Joi.number().required(),
    title:Joi.string().required()
    ,description:Joi.string().required()
    ,duration:Joi.number().required()
    ,isFree:Joi.boolean().required()
    ,courceId:Joi.string().required()
    
})
const updatelessonSchema=Joi.object({
    order:Joi.number().required(),
    title:Joi.string().required()
    ,description:Joi.string().required()
    ,duration:Joi.number().required()
    ,isFree:Joi.boolean().required()
    ,courceId:Joi.string().required()
})
    const deleteSchema=Joi.object({
        id: Joi.string().required() 
    })
    const getsinglelessonSchema=Joi.object({
        id: Joi.string().required() 
    })
const uploadVideoSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});
const uploadpdfSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});
const studentshowlessonSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});
const studentshowlessonsSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});
module.exports={createlessonSchema,updatelessonSchema,deleteSchema,getsinglelessonSchema,uploadVideoSchema,uploadpdfSchema,studentshowlessonSchema,studentshowlessonsSchema}