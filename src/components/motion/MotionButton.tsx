"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface MotionButtonProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  y?: number;
}

export function MotionButton({
  children,
  className = "inline-block",
  scale = 1.02,
  y = -1,
}: MotionButtonProps) {
  return (
    <motion.div
      whileHover={{ scale, y }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
