const request = require("supertest");
const app = require("../server");

describe("Student API Integration Tests", () => {
  it("should insert a new student", async () => {
    const res = await request(app)
      .post("/api/students")   // ✅ must match server.js
      .send({
        name: "Test Student",
        email: "test@example.com",
        age: 22
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Student Registered!");
  });

  it("should fetch all students", async () => {
    const res = await request(app).get("/api/students"); // ✅ must match

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// ✅ Close DB pool after tests
afterAll(async () => {
  await db.end();
});