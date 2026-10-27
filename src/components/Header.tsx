"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo";
import { SocialLinks } from "@/components/SocialLinks";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis-store";
import { contact, nav } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Freeze the page behind the mobile menu.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled || open
            ? "border-b border-line bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {/* Reading progress */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-maroon via-maroon-deep to-maroon"
        />

        <div
          className={cn(
            "shell flex items-center justify-between transition-all duration-500",
            scrolled ? "h-[68px]" : "h-[92px]",
          )}
        >
          <Link
            href="/"
            aria-label="Metro Surfaces home"
            className="group relative z-10 shrink-0"
          >
            <Logo compact={scrolled} className="transition-transform duration-500 group-hover:scale-[1.02]" />
          </Link>

          <nav className="hidden items-center gap-4 whitespace-nowrap lg:flex xl:gap-9" aria-label="Primary">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-sm font-light tracking-wide transition-colors duration-300",
                    active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-maroon-deep"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="group hidden items-center gap-2.5 border border-line-strong px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-ink transition-colors duration-400 hover:border-maroon hover:bg-maroon/8 sm:inline-flex"
            >
              Enquire
              <span className="transition-transform duration-400 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="block h-px w-6 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="block h-px w-6 bg-ink"
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-paper-deep/98 pt-[92px] backdrop-blur-2xl lg:hidden"
          >
            <div className="bloom pointer-events-none absolute -top-24 right-0 h-96 w-96" />

            <nav
              className="shell relative flex flex-1 flex-col justify-center gap-1"
              aria-label="Mobile"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, delay: 0.06 * i, ease: EASE }}
                  className="overflow-hidden border-b border-line"
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-4 py-4 font-display text-4xl font-light text-ink transition-colors duration-300 hover:text-maroon sm:text-5xl"
                  >
                    <span className="eyebrow text-[0.6rem]">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="shell relative pb-12"
            >
              <p className="eyebrow mb-3">Direct</p>
              <a
                href={contact.phoneHref}
                className="block font-display text-2xl text-ink"
              >
                {contact.phone}
              </a>
              <a
                href={contact.emailHref}
                className="mt-1 block text-sm text-ink-soft"
              >
                {contact.email}
              </a>
              <SocialLinks className="mt-6" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
