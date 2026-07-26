"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  y?: number;
}

export function HoverCard({
  children,
  className,
  scale = 1.02,
  y = -4,
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ scale, y }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
