import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../../../src/app";
import { createTestToken, authCookie } from "../../helpers/auth";
import { getPrisma } from "@dataflow/database";

describe("Auth Module", () => {
  let testUserId: string;

  beforeAll(async () => {
    const prisma = getPrisma();
    const user = await prisma.user.create({
      data: {
        email: "test-auth@example.com",
        name: "Test Auth",
      },
    });
    testUserId = user.id;
  });

  afterAll(async () => {
    const prisma = getPrisma();
    await prisma.user.delete({
      where: { id: testUserId },
    });
  });

  describe("GET /api/auth/me", () => {
    it("should return 401 without token", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Authentication token is missing.");
    });

    it("should return 200 with valid token", async () => {
      const token = createTestToken(testUserId, "test-auth@example.com");
      const response = await request(app)
        .get("/api/auth/me")
        .set("Cookie", authCookie(token));

      expect(response.status).toBe(200);
      expect(response.body.email).toBe("test-auth@example.com");
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should return 200 and clear cookie", async () => {
      const response = await request(app).post("/api/auth/logout");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Logged out successfully.");
      expect(response.headers["set-cookie"]).toBeDefined();
    });
  });
});
