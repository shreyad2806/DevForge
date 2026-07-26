"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MotionButton } from "@/components/motion/MotionButton";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-2", className)}
      aria-label="Newsletter subscription"
    >
      <div className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="flex-1"
          aria-label="Email address"
          aria-invalid={status === "error"}
          required
        />
        <MotionButton>
          <Button type="submit" size="default">
            Subscribe
          </Button>
        </MotionButton>
      </div>

      {status === "success" && (
        <p className="text-xs text-primary" role="status">
          Thanks for subscribing.
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-destructive" role="alert">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
