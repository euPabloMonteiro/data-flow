import {
  Controller,
  Route,
  Get,
  Post,
  Query,
  Security,
  Request,
  Response,
} from "tsoa";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { AuthService } from "./auth.service";
import { AppError } from "../../errors/AppError";
import { env } from "../../env";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

interface MeResponse {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

interface LogoutResponse {
  message: string;
}

@Route("auth")
export class AuthController extends Controller {
  private setAuthCookie(res: ExpressResponse, name: string, value: string) {
    res.cookie(name, value, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em milisegundos.
      path: "/",
    });
  }

  @Security("jwt")
  @Get("/me")
  @Response("404", "User not found")
  async getMe(@Request() req: AuthenticatedRequest): Promise<MeResponse> {
    const userId = req.user?.sub;
    if (!userId) throw new AppError("User not found.", 404);

    return await new AuthService().getMe(userId);
  }

  @Get("/github/callback")
  async githubCallback(
    @Query() code: string,
    @Request() req: ExpressRequest,
  ): Promise<void> {
    this.setStatus(302);

    try {
      const { token } = await new AuthService().validateGithubUser(code);
      this.setAuthCookie(req.res!, "auth_token", token);
      this.setHeader("Location", `${env.AUTH_REDIRECT_URL}/dashboard`);
    } catch (error) {
      const message =
        error instanceof AppError ? error.message : "Authentication failed";
      this.setHeader(
        "Location",
        `${env.AUTH_REDIRECT_URL}/?auth_error=${encodeURIComponent(message)}`,
      );
    }
  }

  @Get("/google/callback")
  async googleCallback(
    @Query() code: string,
    @Request() req: ExpressRequest,
  ): Promise<void> {
    this.setStatus(302);
    if (!code) throw new AppError("Code not provided.", 400);

    try {
      const { token } = await new AuthService().validateGoogleUser(code);
      this.setAuthCookie(req.res!, "auth_token", token);
      this.setHeader("Location", `${env.AUTH_REDIRECT_URL}/dashboard`);
    } catch (error) {
      const message =
        error instanceof AppError ? error.message : "Authentication failed";
      this.setHeader(
        "Location",
        `${env.AUTH_REDIRECT_URL}/?auth_error=${encodeURIComponent(message)}`,
      );
    }
  }

  @Post("/logout")
  async logout(@Request() req: ExpressRequest): Promise<LogoutResponse> {
    req.res?.clearCookie("auth_token");
    return { message: "Logged out successfully." };
  }
}
