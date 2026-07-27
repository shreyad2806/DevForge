"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function formatAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("already registered") || lower.includes("user already exists")) {
    return "An account with this email already exists.";
  }
  if (lower.includes("invalid email") || lower.includes("unable to validate email")) {
    return "Please enter a valid email address.";
  }
  if (lower.includes("password")) {
    return "Password does not meet requirements.";
  }
  if (lower.includes("network") || lower.includes("fetch")) {
    return "Network error. Please check your connection and try again.";
  }
  return message;
}

export async function signup(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Name, email and password are required." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { error: formatAuthError(error.message) };
  }

  if (!data.user) {
    return { error: "Sign up failed. Please try again." };
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    name,
    email,
    plan: "Free",
    created_at: new Date().toISOString(),
  });

  if (profileError) {
    return { error: profileError.message };
  }

  redirect("/dashboard");
}
