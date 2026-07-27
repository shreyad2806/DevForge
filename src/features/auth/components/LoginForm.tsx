"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { login } from "@/app/login/actions";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const result = await login(formData);
      if (result?.error) {
        toast.add({
          type: "error",
          title: "Sign in failed",
          description: result.error,
          timeout: 5000,
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
        return;
      }
      toast.add({
        type: "error",
        title: "Network error",
        description: "Please check your connection and try again.",
        timeout: 5000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="login-email" className="text-xs font-medium text-foreground">
          Email address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            className="h-11 rounded-xl border-border/60 bg-background pl-10"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="text-xs font-medium text-foreground">
            Password
          </label>
          <button
            type="button"
            className="text-xs text-primary transition-opacity hover:opacity-80"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            className="h-11 rounded-xl border-border/60 bg-background pl-10"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="login-remember"
          type="checkbox"
          className="size-4 rounded border-border/60 bg-background text-primary"
          {...register("remember")}
        />
        <label htmlFor="login-remember" className="text-sm text-foreground">
          Remember me
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-xl">
        {isSubmitting ? "Signing in..." : "Sign in"}
        <ArrowRight className="ml-2 size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
