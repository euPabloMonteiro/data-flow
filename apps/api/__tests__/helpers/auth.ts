import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export function createTestToken(userId: string, email: string): string {
  const envPath = path.resolve(__dirname, "../../../../.env");
  const envContent = fs.readFileSync(envPath, "utf-8");
  const privateKeyMatch = envContent.match(/JWT_PRIVATE_KEY="(.+?)"/s);

  if (!privateKeyMatch) {
    throw new Error("JWT_PRIVATE_KEY not found in .env");
  }

  const privateKey = privateKeyMatch[1].replace(/\\n/g, "\n");

  const payload = {
    sub: userId,
    email,
  };

  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
}

export function authCookie(token: string): string {
  return `auth_token=${token}`;
}
