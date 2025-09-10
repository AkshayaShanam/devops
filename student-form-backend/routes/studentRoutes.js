const express = require("express");
const router = express.Router();
const { addStudent, getStudents } = require("../controllers/studentController");

// POST → Insert student
router.post("/", addStudent);

// GET → Fetch all students
router.get("/", getStudents);

module.exports = router;
