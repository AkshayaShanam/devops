const request = require("supertest");
const app = require("../server");
const pool = require("../config/db"); // MySQL pool

describe("Student API Integration Tests", () => {
  // Insert new student
  it("should insert a new student", async () => {
    const res = await request(app)
      .post("/api/students")   // 👈 Correct endpoint
      .send({
        name: "Test Student",
        email: "test@example.com",
        age: 20,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Student Registered!");
  });

  // Fetch all students
  it("should fetch all students", async () => {
    const res = await request(app).get("/api/students");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Close DB pool after tests
  afterAll(async () => {
    await pool.end();
  });
});
