"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { OAuthButtons } from "./oauth-buttons";

const loginSchema = z.object({
  email: z.string().email({ message: "Insira um e-mail válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  }

  const isFormDisabled = isLoading || isOAuthLoading;

  return (
    <div className="space-y-4 pt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-df-text text-sm">
            E-mail
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-df-muted" />
            <Input
              id="email"
              placeholder="exemplo@email.com"
              type="email"
              disabled={isFormDisabled}
              className="pl-10 bg-df-bg-secondary/80 border-df-surface/40 text-df-white placeholder:text-df-muted/50 focus:border-df-accent focus:ring-df-accent/20 h-11"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-df-error">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-df-text text-sm">
              Senha
            </Label>
            <Button
              variant="link"
              className="h-auto p-0 text-xs font-normal text-df-accent hover:text-df-accent-hover"
              type="button"
            >
              Esqueceu a senha?
            </Button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-df-muted" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              disabled={isFormDisabled}
              className="pl-10 pr-10 bg-df-bg-secondary/80 border-df-surface/40 text-df-white placeholder:text-df-muted/50 focus:border-df-accent focus:ring-df-accent/20 h-11"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-df-muted hover:text-df-text transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-df-error">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            className="border-df-surface/60 data-[state=checked]:bg-df-accent data-[state=checked]:border-df-accent"
            {...register("rememberMe")}
          />
          <Label
            htmlFor="remember"
            className="text-sm font-medium text-df-muted leading-none cursor-pointer"
          >
            Lembrar de mim
          </Label>
        </div>

        <Button
          className="w-full bg-df-accent hover:bg-df-accent-hover text-white font-semibold h-11 rounded-lg transition-all hover:shadow-lg hover:shadow-df-accent/25 cursor-pointer"
          type="submit"
          disabled={isFormDisabled}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>

      <OAuthButtons
        label="Continuar"
        disabled={isLoading}
        onLoadingChange={setIsOAuthLoading}
      />
    </div>
  );
}
