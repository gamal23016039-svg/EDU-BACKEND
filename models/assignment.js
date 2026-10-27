const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
  courceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String
  },
  dueDate: {
    type: Date
  }
}, 
{ timestamps: true });

module.exports = mongoose.model("assignment", assignmentSchema);