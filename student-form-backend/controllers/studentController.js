const db = require("../config/db");

exports.addStudent = (req, res) => {
  console.log("📥 Incoming data:", req.body); // Log incoming data

  const { student_id, name, email, course, mobile_no, gender, dob, passout_year, address } = req.body;

  const sql = `INSERT INTO students 
    (student_id, name, email, course, mobile_no, gender, dob, passout_year, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [student_id, name, email, course, mobile_no, gender, dob, passout_year, address], (err, result) => {
  if (err && err.code) {
    console.error("❌ Insert error:", err.message);
    return res.status(500).json({ error: err.message });
  }

  console.log("✅ Insert result:", result); // debug what’s inside result
  res.status(201).json({ message: "Student Registered!", id: result.insertId });
});

};

exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.error("❌ Fetch error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
