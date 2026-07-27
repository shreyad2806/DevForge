"use client";

import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Lock, ArrowRight, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const password = useWatch({ control, name: "password" });

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup data", data);
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="signup-firstName" className="text-xs font-medium text-foreground">
            First name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="signup-firstName"
              placeholder="John"
              className="h-11 rounded-xl border-border/60 bg-background pl-10"
              {...register("firstName")}
            />
          </div>
          {errors.firstName && (
            <p className="text-xs text-red-400">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="signup-lastName" className="text-xs font-medium text-foreground">
            Last name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="signup-lastName"
              placeholder="Doe"
              className="h-11 rounded-xl border-border/60 bg-background pl-10"
              {...register("lastName")}
            />
          </div>
          {errors.lastName && (
            <p className="text-xs text-red-400">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="signup-email" className="text-xs font-medium text-foreground">
          Email address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="signup-email"
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
        <label htmlFor="signup-password" className="text-xs font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="signup-password"
            type="password"
            placeholder="Create a strong password"
            className="h-11 rounded-xl border-border/60 bg-background pl-10"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-xs text-red-400">{errors.password.message}</p>
        )}

        <ul className="mt-2 flex flex-wrap gap-2">
          {passwordRequirements.map((req) => {
            const valid = req.test(password || "");
            const Icon = valid ? Check : X;
            return (
              <li
                key={req.label}
                className={cn(
                  "flex items-center gap-1 text-[10px]",
                  valid ? "text-emerald-400" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("size-3", valid ? "text-emerald-400" : "text-muted-foreground")} aria-hidden="true" />
                {req.label}
              </li>
            );
          })}
        </ul>
      </div>

      <Button type="submit" className="h-11 w-full rounded-xl">
        Create account
        <ArrowRight className="ml-2 size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
