const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
    },

    skills: [String],

    experience: [
      {
        company: String,
        position: String,
        years: String,
      },
    ],

    education: [
      {
        institution: String,
        degree: String,
        year: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);