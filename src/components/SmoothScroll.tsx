"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { setLenis } from "@/lib/lenis-store";

/** Clearance for the fixed header when a section has no scroll-margin. */
const HEADER_CLEARANCE = 96;

/**
 * Momentum scrolling for the whole document.
 *
 * Implemented as a null-rendering effect rather than a wrapper component so
 * the page tree is never remounted. That keeps scroll-triggered animations
 * from replaying when smooth scroll initialises. Honours prefers-reduced-motion
 * by simply never starting.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    // Same-page anchors go through Lenis to stay smooth. Listening in the
    // capture phase runs this before next/link's own handler, which then
    // sees the click is handled and stays out of it. Left to Next, a hash
    // link on the page it points at stacks the new hash onto the old one
    // (/products#a#b) and the section is never found.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = findHashTarget(url.hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: extraOffset(target), duration: 1.4 });
      window.history.pushState(null, "", url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Land at the top on navigation, or on the section the link named. Lenis
  // holds its own scroll position, so a plain jump to the top here used to
  // throw away the hash: /products#decorative-louvers opened at the header.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Next.js 16 can hand over a stacked hash (/products#a#b) when it reuses
    // a cached route. Only the last one is the section asked for, so tidy
    // the address bar back to that.
    const hash = lastHash(window.location.hash);
    if (hash !== window.location.hash) {
      const { pathname: path, search } = window.location;
      window.history.replaceState(window.history.state, "", path + search + hash);
    }
    if (!hash) {
      lenis.scrollTo(0, { immediate: true, force: true });
      return;
    }

    // One jump isn't enough: the pathname can change before the new page has
    // mounted, and Lenis still holds the old page's height, so it clamps the
    // jump short. Keep aiming at the section until it holds still under the
    // header, and hand control back the moment the visitor scrolls.
    const started = performance.now();
    let steady = 0;
    let frame = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };

    const aim = () => {
      const target = findHashTarget(hash);
      if (target) {
        lenis.resize();
        lenis.scrollTo(target, {
          offset: extraOffset(target),
          immediate: true,
          force: true,
        });
        const top = target.getBoundingClientRect().top;
        steady = Math.abs(top - landingTop(target)) < 2 ? steady + 1 : 0;
      }
      if (steady < 5 && performance.now() - started < 2000) {
        frame = requestAnimationFrame(aim);
      } else {
        stop();
      }
    };

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    aim();

    return stop;
  }, [pathname]);

  return null;
}

/**
 * How far below the top a section should land: its own scroll-margin, the
 * same value Next.js aims for when it scrolls to a hash, so the two never
 * pull in different directions. Sections without one clear the header.
 */
function landingTop(target: HTMLElement): number {
  return parseFloat(getComputedStyle(target).scrollMarginTop) || HEADER_CLEARANCE;
}

/**
 * The offset to hand Lenis. Lenis already subtracts a target's
 * scroll-margin, so passing it again would land the section twice as low.
 */
function extraOffset(target: HTMLElement): number {
  return parseFloat(getComputedStyle(target).scrollMarginTop) ? 0 : -HEADER_CLEARANCE;
}

/** The last "#fragment" in a hash, which is the one that was clicked. */
function lastHash(hash: string): string {
  const cut = hash.lastIndexOf("#");
  return cut > 0 ? hash.slice(cut) : hash;
}

/** The element a URL hash points at, or null for no hash or no match. */
function findHashTarget(hash: string): HTMLElement | null {
  const id = decodeURIComponent(lastHash(hash).slice(1));
  return id ? document.getElementById(id) : null;
}
