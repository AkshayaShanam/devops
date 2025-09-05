const request = require("supertest");
const app = require("../server"); // Import your Express app

describe("Student API Integration Tests", () => {
  it("should insert a new student", async () => {
    const res = await request(app)
      .post("/api/students")
      .send({
        student_id: "232211a7b1",
        name: "Test Student",
        email: "teststudent@gmail.com",
        course: "CSE",
        mobile_no: "9876543210",
        gender: "Male",
        dob: "2000-01-01",
        passout_year: "2025",
        address: "Hyderabad"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Student Registered!");
  });

  it("should fetch all students", async () => {
    const res = await request(app).get("/api/students");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
