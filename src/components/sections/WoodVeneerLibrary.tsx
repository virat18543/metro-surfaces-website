"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { getLenis } from "@/lib/lenis-store";
import {
  woodVeneers,
  woodVeneerSpecs,
  type WoodVeneer,
} from "@/lib/woodveneer";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Searchable veneer catalogue. The Acry Plus folder prints a colour number
 * under each finish and nothing else, so that number is what search matches.
 */
export function WoodVeneerLibrary() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<WoodVeneer | null>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return woodVeneers.filter(
      (veneer) => !needle || veneer.colourCode.includes(needle),
    );
  }, [query]);

  return (
    <>
      {/* ---------------- Toolbar ---------------- */}
      <div className="border-y border-line bg-paper-raised">
        <div className="p-5 lg:p-6">
          <label className="relative block">
            <span className="sr-only">Search by colour number</span>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-dim" />
            <input
              type="search"
              inputMode="numeric"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by colour number"
              className="w-full border border-line bg-paper py-3.5 pr-4 pl-11 text-sm font-light text-ink transition-colors duration-300 placeholder:text-ink-dim hover:border-line-strong focus:border-maroon focus:outline-none"
            />
          </label>
        </div>

        <p
          aria-live="polite"
          className="border-t border-line px-5 py-3 text-xs tracking-[0.16em] uppercase text-ink-dim lg:px-6"
        >
          Showing{" "}
          <span className="text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "finish" : "finishes"}
        </p>
      </div>

      {/* ---------------- Grid ---------------- */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((veneer) => (
            <SwatchCard
              key={veneer.colourCode}
              veneer={veneer}
              onOpen={() => setActive(veneer)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-paper px-6 py-24 text-center">
          <p className="font-display text-2xl font-light text-ink">
            No finishes match that search.
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            Try a colour number such as &ldquo;5901&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-8 inline-flex items-center gap-3 border border-line-strong px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-ink-soft transition-colors duration-500 hover:border-ink-dim hover:text-ink"
          >
            Clear search
          </button>
        </div>
      )}

      <VeneerDialog veneer={active} onClose={() => setActive(null)} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function SwatchCard({
  veneer,
  onOpen,
}: {
  veneer: WoodVeneer;
  onOpen: () => void;
}) {
  return (
    <article className="group relative flex flex-col bg-paper transition-colors duration-500 hover:bg-paper-raised">
      <div
        className="relative aspect-[5/4] w-full overflow-hidden"
        style={{ backgroundColor: `#${veneer.tone}` }}
      >
        <Image
          src={veneer.image}
          alt={`Wood veneer finish, colour ${veneer.colourCode}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        {/* Pale finishes would otherwise dissolve into the paper canvas. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 ring-1 ring-ink/10 ring-inset"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="eyebrow">Colour</p>

        <h3 className="mt-3 font-display text-xl leading-tight font-light text-ink">
          {/* Stretched link: the whole card is the hit target, but the 3D
              link below stays independently clickable. */}
          <button
            type="button"
            onClick={onOpen}
            className="text-left after:absolute after:inset-0 after:content-['']"
          >
            {veneer.colourCode}
            <span className="sr-only"> full specification</span>
          </button>
        </h3>

        <a
          href={veneer.renderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 mt-auto inline-flex items-center gap-2 self-start pt-5 text-xs tracking-[0.16em] uppercase text-ink-dim transition-colors duration-300 hover:text-maroon"
        >
          3D scene
          <ExternalIcon className="h-3 w-3" />
          <span className="sr-only">
            for colour {veneer.colourCode}, opens in a new tab
          </span>
        </a>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function VeneerDialog({
  veneer,
  onClose,
}: {
  veneer: WoodVeneer | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const open = veneer !== null;

  // Freeze the page behind the dialog, matching the mobile menu's approach.
  useEffect(() => {
    if (!open) return;

    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {veneer && (
        <motion.div
          key="veneer-dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-ink/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="veneer-dialog-title"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto border border-line bg-paper shadow-lift"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center border border-line bg-paper/80 text-ink-soft backdrop-blur transition-colors duration-300 hover:border-maroon hover:text-maroon"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            <div className="grid sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
              <div
                className="relative min-h-[11rem] sm:min-h-full"
                style={{ backgroundColor: `#${veneer.tone}` }}
              >
                <Image
                  src={veneer.image}
                  alt={`Wood veneer finish, colour ${veneer.colourCode}`}
                  fill
                  sizes="(min-width: 640px) 16rem, 100vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 ring-1 ring-ink/10 ring-inset"
                />
              </div>

              <div className="p-6 lg:p-9">
                <p className="eyebrow flex items-center gap-3">
                  <span className="text-maroon">Acry Plus™</span>
                  <span className="h-px w-8 bg-line-strong" />
                  Wood veneer
                </p>

                <h2
                  id="veneer-dialog-title"
                  className="mt-5 font-display text-3xl leading-tight font-light text-ink lg:text-4xl"
                >
                  Colour {veneer.colourCode}
                </h2>

                <dl className="mt-8 border-t border-line">
                  {woodVeneerSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4"
                    >
                      <dt className="text-xs tracking-[0.16em] uppercase text-ink-dim">
                        {spec.label}
                      </dt>
                      <dd className="text-sm text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={veneer.renderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 bg-maroon px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-white transition-colors duration-500 hover:bg-maroon-deep"
                >
                  View 3D scene
                  <ExternalIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
                </a>
                <p className="mt-3 text-xs text-ink-dim">Opens in a new tab.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Icons ---------------- */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}
