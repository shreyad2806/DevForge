"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const ease = [0.25, 0.1, 0.25, 1.0] as const;

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.06,
  delayChildren = 0,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
