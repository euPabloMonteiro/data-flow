import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AppError } from "../../errors/AppError";
import { env } from "../../env";

export class AuthController {
  constructor(private authService = new AuthService()) {}

  private setAuthCookie(res: Response, token: string) {
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em milisegundos.
      path: "/",
    });
  }

  async getMe(req: Request, res: Response) {
    const userId = req.user?.sub;
    if (!userId) throw new AppError("User not found.", 404);

    const user = await this.authService.getMe(userId);
    return res.status(200).json(user);
  }

  async githubCallback(req: Request, res: Response) {
    const { code } = req.query;
    if (!code) throw new AppError("Code not provided.", 400);

    const { token } = await this.authService.validateGithubUser(code as string);
    this.setAuthCookie(res, token);
    return res.redirect(`${env.AUTH_REDIRECT_URL}/dashboard`);
  }

  async googleCallback(req: Request, res: Response) {
    const { code } = req.query;
    if (!code) throw new AppError("Code not provided.", 400);

    const { token } = await this.authService.validateGoogleUser(code as string);
    this.setAuthCookie(res, token);
    return res.redirect(`${env.AUTH_REDIRECT_URL}/dashboard`);
  }

  async logout(_req: Request, res: Response) {
    res.clearCookie("auth_token");
    return res.status(200).json({ message: "Logged out successfully." });
  }
}
