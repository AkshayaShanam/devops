const db = require("../config/db");

exports.addStudent = (req, res) => {
  console.log("📥 Incoming raw body:", req.body);

  try {
    const student_id = req.body.student_id || req.body.studentId || "";
    const name = req.body.name || "";
    const email = req.body.email || "";
    const course = req.body.course || "";
    const mobile_no = req.body.mobile_no || req.body.mobile || "";
    const gender = req.body.gender || "";
    const dob = req.body.dob || null;
    const passout_year = req.body.passout_year || req.body.passoutYear || null;
    const address = req.body.address || "";

    console.log("📦 Final values →", {
      student_id,
      name,
      email,
      course,
      mobile_no,
      gender,
      dob,
      passout_year,
      address,
    });

    const sql = `INSERT INTO students 
      (student_id, name, email, course, mobile_no, gender, dob, passout_year, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
  sql,
  [student_id, name, email, course, mobile_no, gender, dob, passout_year, address],
  (err, result) => {
    if (err) {
      console.error("❌ Insert error code:", err.code);
      console.error("❌ Insert error SQL:", err.sqlMessage);
      console.error("❌ Inserted values:", [
        student_id, name, email, course, mobile_no, gender, dob, passout_year, address
      ]);
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ Insert result:", result);
    res.status(201).json({ message: "Student Registered!", id: result.insertId });
  }
);

  } catch (e) {
    console.error("❌ Unexpected error:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.getStudents = (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Fetch error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
