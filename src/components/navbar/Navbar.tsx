"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Hexagon, Menu } from "lucide-react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MotionButton } from "@/components/motion/MotionButton";
import { ThemeToggle } from "@/components/theme-toggle";
import { mainNavigation, type NavItem } from "@/constants/navigation";

interface NavbarProps {
  className?: string;
  items?: NavItem[];
}

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 text-foreground transition-colors hover:text-primary"
      aria-label="DevForge home"
    >
      <Hexagon
        className="size-7 fill-primary/20 text-primary transition-colors group-hover:fill-primary/30"
        aria-hidden="true"
      />
      <span className="text-lg font-semibold tracking-tight">DevForge</span>
    </Link>
  );
}

export function Navbar({
  className,
  items = mainNavigation,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-colors",
        className
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12"
        aria-label="Main"
      >
        <Logo />

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {Icon && <Icon className="size-4" aria-hidden="true" />}
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-1 left-3 right-3 h-px bg-primary"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <MotionButton>
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Sign In
            </Link>
          </MotionButton>
          <MotionButton>
            <Link
              href="/get-started"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              Get Started
            </Link>
          </MotionButton>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "lg:hidden"
                )}
                aria-label={
                  mobileOpen ? "Close navigation menu" : "Open navigation menu"
                }
              />
            }
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>
                <span className="flex items-center gap-2">
                  <Hexagon
                    className="size-7 fill-primary/20 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-lg font-semibold tracking-tight">
                    DevForge
                  </span>
                </span>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation menu for DevForge.
              </SheetDescription>
            </SheetHeader>

            <motion.ul
              className="flex flex-1 flex-col gap-1 py-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.05 },
                },
                hidden: {},
              }}
            >
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;

                return (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: 16 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.3,
                          ease: [0.25, 0.1, 0.25, 1.0],
                        },
                      },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {Icon && <Icon className="size-5" aria-hidden="true" />}
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="mt-auto flex flex-col gap-3 border-t border-border p-4"
            >
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span className="text-sm text-muted-foreground">Appearance</span>
                <ThemeToggle />
              </div>
              <MotionButton className="w-full">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-center"
                  )}
                >
                  Sign In
                </Link>
              </MotionButton>
              <MotionButton className="w-full">
                <Link
                  href="/get-started"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full justify-center"
                  )}
                >
                  Get Started
                </Link>
              </MotionButton>
            </motion.div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
