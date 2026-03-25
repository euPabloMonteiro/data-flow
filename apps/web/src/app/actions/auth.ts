"use server";

import { redirect } from "next/navigation";
import { env } from "../../env";

export async function loginWithGithub() {
  const clientId = env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  if (!clientId) {
    throw new Error("NEXT_PUBLIC_GITHUB_CLIENT_ID is not configured");
  }

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;
  redirect(githubAuthUrl);
}

export async function loginWithGoogle() {
  const clientId = env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_CALLBACK;

  if (!clientId || !redirectUri) {
    throw new Error("Google OAuth environment variables are not configured");
  }

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid email profile`;
  redirect(googleAuthUrl);
}
