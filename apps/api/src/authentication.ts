import type { Request } from "express";
import { SecurityUtils } from "./common/utils/security";

export async function expressAuthentication(
  request: Request,
  securityName: string,
  _scopes?: string[],
): Promise<{ sub: string; email: string }> {
  if (securityName !== "jwt") {
    throw new Error(`Unknown security scheme: ${securityName}`);
  }

  const token = request.cookies?.["auth_token"];

  if (!token) {
    throw Object.assign(new Error("Authentication token is missing."), {
      status: 401,
    });
  }

  try {
    const decoded = SecurityUtils.verifyToken(token) as {
      sub: string;
      email: string;
    };
    return decoded;
  } catch {
    throw Object.assign(new Error("Invalid authentication token."), {
      status: 401,
    });
  }
}
