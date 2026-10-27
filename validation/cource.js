const Joi = require("joi")
const createcourceSchema=Joi.object({
    title:Joi.string().required()
    ,description:Joi.string().required()
    ,price:Joi.string().required()
})
const updatecourceSchema=Joi.object({
    title:Joi.string().required()
    ,description:Joi.string().required()
    ,price:Joi.string().required()})
    const deleteSchema=Joi.object({
        id: Joi.string().required() 
    })
    const getsinglecourceSchema=Joi.object({
        id: Joi.string().required() 
    })
    const publishcourceSchema=Joi.object({
        id: Joi.string().required() 
    })
    module.exports={createcourceSchema,updatecourceSchema,deleteSchema,getsinglecourceSchema,publishcourceSchema}