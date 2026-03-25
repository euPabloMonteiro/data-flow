import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { env } from "../../env";

export const SecurityUtils = {
  hashPassword: async (password: string) => {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 4,
      parallelism: 1,
    });
  },

  verifyPassword: async (hash: string, password: string) => {
    return await argon2.verify(hash, password);
  },

  signToken: (payload: object) => {
    return jwt.sign(payload, env.JWT_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "7d",
    });
  },

  verifyToken: (token: string) => {
    return jwt.verify(token, env.JWT_PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
  },
};
