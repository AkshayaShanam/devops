const db = require("../config/db");

exports.addStudent = (req, res) => {
  console.log("📥 Incoming data:", req.body);

  // Normalize keys + provide safe defaults
  const student_id = req.body.student_id || req.body.studentId || "";
  const name = req.body.name || "";
  const email = req.body.email || "";
  const course = req.body.course || "";
  const mobile_no = req.body.mobile_no || req.body.mobile || "";
  const gender = req.body.gender || "";
  const dob = req.body.dob || null; // date can be null
  const passout_year = req.body.passout_year || req.body.passoutYear || null;
  const address = req.body.address || "";

  const sql = `INSERT INTO students 
    (student_id, name, email, course, mobile_no, gender, dob, passout_year, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [student_id, name, email, course, mobile_no, gender, dob, passout_year, address],
    (err, result) => {
      if (err) {
        console.error("❌ Insert error:", err.message);
        return res.status(500).json({ error: err.message });
      }

      console.log("✅ Insert result:", result);
      res.status(201).json({ message: "Student Registered!", id: result.insertId });
    }
  );
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
