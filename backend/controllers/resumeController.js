const Resume = require("../models/Resume");


// CREATE RESUME
const createResume = async (req, res) => {
  try {

    const resume = await Resume.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json(resume);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET USER RESUMES
const getUserResumes = async (req, res) => {
  try {

    const resumes = await Resume.find({
      user: req.user._id,
    });

    res.status(200).json(resumes);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE RESUME
const updateResume = async (req, res) => {
  try {

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // check ownership
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedResume);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE RESUME
const deleteResume = async (req, res) => {
  try {

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // check ownership
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      message: "Resume deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  createResume,
  getUserResumes,
  updateResume,
  deleteResume,
};