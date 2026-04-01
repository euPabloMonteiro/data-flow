import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import path from "path";
import { app } from "../../../src/app";
import { createTestToken, authCookie } from "../../helpers/auth";
import { getPrisma } from "@dataflow/database";

describe("Upload Endpoints", () => {
  let testUserId: string;
  let authToken: string;

  beforeAll(async () => {
    const user = await getPrisma().user.create({
      data: { email: "test-upload@example.com", name: "Upload Test User" },
    });
    testUserId = user.id;
    authToken = createTestToken(testUserId, "test-upload@example.com");
  });

  afterAll(async () => {
    await getPrisma().sale.deleteMany({
      where: { upload: { userId: testUserId } },
    });
    await getPrisma().upload.deleteMany({
      where: { userId: testUserId },
    });
    await getPrisma().user.delete({
      where: { id: testUserId },
    });
  });

  describe("POST /api/uploads", () => {
    it("should return 401 without token", async () => {
      const response = await request(app)
        .post("/api/uploads")
        .attach(
          "file",
          Buffer.from("date,product\n2024-01-01,Test"),
          "test.csv",
        );

      expect(response.status).toBe(401);
    });

    it("should return 400 without file", async () => {
      const response = await request(app)
        .post("/api/uploads")
        .set("Cookie", authCookie(authToken));

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("file is required");
    });

    it("should return 201 with valid CSV file", async () => {
      const csvContent =
        "date,product,category,price,quantity,customer_country\n2024-01-01,Product A,Category 1,10.50,2,Brazil";

      const response = await request(app)
        .post("/api/uploads")
        .set("Cookie", authCookie(authToken))
        .attach("file", Buffer.from(csvContent), "test.csv");

      expect(response.status).toBe(201);
      expect(response.body.uploadId).toBeDefined();
      expect(response.body.jobId).toBeDefined();
    });
  });

  describe("GET /api/uploads", () => {
    it("should return 401 without token", async () => {
      const response = await request(app).get("/api/uploads");

      expect(response.status).toBe(401);
    });

    it("should return user uploads", async () => {
      const response = await request(app)
        .get("/api/uploads")
        .set("Cookie", authCookie(authToken));

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/uploads/:id", () => {
    it("should return 401 without token", async () => {
      const response = await request(app).get("/api/uploads/some-id");

      expect(response.status).toBe(401);
    });

    it("should return 404 for non-exist upload", async () => {
      const response = await request(app)
        .get("/api/uploads/00000000-0000-0000-0000-000000000000")
        .set("Cookie", authCookie(authToken));

      expect(response.status).toBe(404);
    });
  });
});
