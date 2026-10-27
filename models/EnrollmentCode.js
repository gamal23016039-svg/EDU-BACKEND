const mongoose= require("mongoose")
const enrollmentCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  courceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cource",
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  isUsed: {
    type: Boolean,
    default: false
  },

  usedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null
  }
}, { timestamps: true });

module.exports=mongoose.model("EnrollmentCode",enrollmentCodeSchema)