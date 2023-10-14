import request from "supertest";
import { app } from "../src/server";
import Attendance from "../src/models/attendance";

// Clear the database before each test
beforeEach(async () => {
  await Attendance.deleteMany({});
});

describe("POST /attendance", () => {
  it("should create a new attendance record successfully", async () => {
    const res = await request(app).post("/attendance").send({
      student: "6519cd04c117c048507f7398",
      session: "6522a83f4f87ae5ea8492715",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("student");
    expect(res.body).toHaveProperty("session");
  });

  it("should return an error if attendance record already exists", async () => {
    await request(app).post("/attendance").send({
      student: "6519cd04c117c048507f7398",
      session: "6522a83f4f87ae5ea8492715",
    });

    const res = await request(app).post("/attendance").send({
      student: "6519cd04c117c048507f7398",
      session: "6522a83f4f87ae5ea8492715",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Attendance already exists");
  });

  it("should return an error if required fields are missing", async () => {
    const res = await request(app).post("/attendance").send({
      student: "6519cd04c117c048507f7398",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Session is required");
  });
});

describe("GET /attendance/session/:id", () => {
  it("should retrieve all attendance records for a given session ID", async () => {
    const res = await request(app).get(
      "/attendance/session/6522a83f4f87ae5ea8492715"
    );
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return an error for an invalid session ID", async () => {
    const res = await request(app).get("/attendance/session/invalidId");
    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Error fetching attendances");
  });

  it("should return an empty array if no attendance records exist for a session", async () => {
    const res = await request(app).get(
      "/attendance/session/mockEmptySessionId"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it("should populate student name in the attendance records", async () => {
    const res = await request(app).get(
      "/attendance/session/mockSessionIdWithStudent"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty("student.name");
  });
});
