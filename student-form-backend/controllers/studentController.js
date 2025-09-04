const db = require("../config/db");

exports.addStudent = (req, res) => {
  console.log("📥 Incoming data:", req.body); // Debugging line
  const { student_id, name, email, course, mobile_no, gender, dob, passout_year, address} = req.body;

  const sql = `INSERT INTO students 
    (student_id, name, email, course, mobile_no, gender, dob, passout_year, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [student_id, name, email, course, mobile_no, gender, dob, passout_year, address],
    (err) => {
      if (err){
         console.error("❌ Insert error:", err); // Debugging
         return res.status(500).json({ error: err.message });
      }
        res.status(201).json({ message: "Student added successfully!" });
    }
  );
};

exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
