const mongoose = require("mongoose");

const SubmissionsSchema = mongoose.Schema({

  assignmentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"assignment",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
    required: true
  },
  answer: {
    type: String,
    default:null
  },
  status: {
    type: String,
    enum:["submitted","graded","late"],
    required: true
  },
  fileUrl: {
    type: String,
    default:null
  },
  grade: {
    type: Number,
     default: null
  },
   feedback: {
    type: String
  }
}, 
{ timestamps: true });

module.exports = mongoose.model("Submissions", SubmissionsSchema);