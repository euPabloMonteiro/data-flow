import axios from "axios";
import { AuthRepository } from "./auth.repository";
import { SecurityUtils } from "../../common/utils/security";
import { AppError } from "../../errors/AppError";
import { env } from "../../env";

export class AuthService {
  constructor(private authRepository = new AuthRepository()) {}

  async getMe(userId: string) {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user;
  }

  async validateGithubUser(code: string) {
    try {
      const tokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        },
        {
          headers: { Accept: "application/json" },
        },
      );

      const { access_token } = tokenResponse.data;

      const userResponse = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const { id, email, name, login } = userResponse.data;

      const userEmail = email || `${login}@github.com`;

      const user = await this.authRepository.createOAuthUser({
        email: userEmail,
        name: name || login,
        githubId: String(id),
      });

      const token = SecurityUtils.signToken({
        sub: user.id,
        email: user.email,
      });

      return { token, user };
    } catch (error) {
      throw new AppError("Failed to validate github user.", 401);
    }
  }

  async validateGoogleUser(code: string) {
    try {
      const tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          code,
          client_id: env.GOOGLE_CLIENT_ID,
          client_secret: env.GOOGLE_CLIENT_SECRET,
          redirect_uri: env.GOOGLE_REDIRECT_URI_CALLBACK,
          grant_type: "authorization_code",
        },
      );

      const { access_token } = tokenResponse.data;

      const userResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      const { id, email, name } = userResponse.data;

      const user = await this.authRepository.createOAuthUser({
        email,
        name,
        googleId: id,
      });

      const token = SecurityUtils.signToken({
        sub: user.id,
        email: user.email,
      });

      return { token, user };
    } catch (error) {
      throw new AppError("Failed to validate google user.", 401);
    }
  }
}
