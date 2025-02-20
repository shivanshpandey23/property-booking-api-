const request = require("supertest");
const app = require("../server"); // Import the Express app
const mongoose = require("mongoose");

describe("Property API Tests", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Should create a new property", async () => {
    const res = await request(app)
      .post("/api/properties")
      .send({
        name: "Test House",
        location: "Delhi",
        price: 2000000,
        availableUnits: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test House");
  });

  test("Should retrieve all available properties", async () => {
    const res = await request(app).get("/api/properties");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
