const mongoose=require("mongoose")
const enrollSchema=new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId
    },
    courceId:{
    type:mongoose.Schema.Types.ObjectId  
    },
    paymentStatus:{
        type:String,
        enum:["pending","paid","free"]
    }
},
{
    timestamps:true
}
)
module.exports=mongoose.model('enrollments',enrollSchema)