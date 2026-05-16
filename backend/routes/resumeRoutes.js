const express = require("express");

const router = express.Router();

const {
  createResume,
  getUserResumes,
  updateResume,
  deleteResume,
} = require("../controllers/resumeController");

const {
  protect,
} = require("../middleware/authMiddleware");


// CREATE RESUME
router.post("/", protect, createResume);


// GET USER RESUMES
router.get("/", protect, getUserResumes);


// UPDATE RESUME
router.put("/:id", protect, updateResume);


// DELETE RESUME
router.delete("/:id", protect, deleteResume);


module.exports = router;