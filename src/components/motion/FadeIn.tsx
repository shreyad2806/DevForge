"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const ease = [0.25, 0.1, 0.25, 1.0] as const;

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 16,
}: FadeInProps) {
  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "down"
        ? { y: -distance }
        : direction === "left"
          ? { x: distance }
          : direction === "right"
            ? { x: -distance }
            : {};

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
