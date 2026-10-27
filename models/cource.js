const mongoose = require('mongoose')
const { describe } = require('node:test')
const courceSchema=new mongoose.Schema({
  title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    thumbnail: {
      type: String,
      default: null,
    },
    lessonsCount: {
      type: Number,
      default: 0,
    },

    studentsCount: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
    image:{},
  },
  {
    timestamps: true,
  })
  module.exports=mongoose.model("cource",courceSchema)