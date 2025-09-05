const express = require("express");
const router = express.Router();
const { addStudent, getStudents } = require("../controllers/studentController");

// no "students" here, since it's already prefixed in server.js
router.post("/", addStudent);
router.get("/", getStudents);

module.exports = router;
