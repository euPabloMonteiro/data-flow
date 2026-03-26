"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { env } from "@/env";

type OAuthButtonsProps = {
  label?: string;
  disabled?: boolean;
  onLoadingChange?: (isLoading: boolean) => void;
};

export function OAuthButtons({
  label = "Continuar",
  disabled = false,
  onLoadingChange,
}: OAuthButtonsProps) {
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const isLoading = isLoadingGithub || isLoadingGoogle;

  const handleGithubLogin = () => {
    setIsLoadingGithub(true);
    onLoadingChange?.(true);

    const url = `https://github.com/login/oauth/authorize?client_id=${env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email`;
    window.location.href = url;
  };

  const handleGoogleLogin = () => {
    setIsLoadingGoogle(true);
    onLoadingChange?.(true);

    const params = new URLSearchParams({
      client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_CALLBACK,
      response_type: "code",
      scope: "openid email profile",
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-df-surface/40"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-df-bg-secondary px-2 text-df-muted">Ou</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 bg-df-bg-secondary border-df-surface/40 text-df-white hover:bg-df-surface/20 transition-all cursor-pointer"
          onClick={handleGithubLogin}
          disabled={disabled || isLoading}
        >
          {isLoadingGithub ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <FaGithub className="mr-2 h-5 w-5" />
          )}
          {label} com GitHub
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full h-11 bg-df-bg-secondary border-df-surface/40 text-df-white hover:bg-df-surface/20 transition-all cursor-pointer"
          onClick={handleGoogleLogin}
          disabled={disabled || isLoading}
        >
          {isLoadingGoogle ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 h-5 w-5 text-red-500" />
          )}
          {label} com Google
        </Button>
      </div>
    </>
  );
}
