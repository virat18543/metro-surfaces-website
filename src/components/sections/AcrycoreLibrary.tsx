"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import {
  acrycoreColours,
  acrycoreFilters,
  type AcrycoreColour,
  type AcrycoreFilter,
} from "@/lib/acrycore";
import { getLenis } from "@/lib/lenis-store";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Searchable colour catalogue. A specifier arrives holding the physical
 * Acrycore folder, so search matches the two things printed on a chip:
 * the shade name and the catalogue number.
 */
export function AcrycoreLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<AcrycoreFilter>("all");
  const [active, setActive] = useState<AcrycoreColour | null>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return acrycoreColours.filter((colour) => {
      const matchesQuery =
        !needle ||
        colour.productName.toLowerCase().includes(needle) ||
        colour.catalogueCode.toLowerCase().includes(needle);
      const matchesFilter = filter === "all" || colour.type === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <>
      {/* ---------------- Toolbar ---------------- */}
      <div className="border-y border-line bg-paper-raised">
        <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:gap-6 lg:p-6">
          <label className="relative flex-1">
            <span className="sr-only">Search by product name or catalogue code</span>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-dim" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product name or catalogue code"
              className="w-full border border-line bg-paper py-3.5 pr-4 pl-11 text-sm font-light text-ink transition-colors duration-300 placeholder:text-ink-dim hover:border-line-strong focus:border-maroon focus:outline-none"
            />
          </label>

          <div
            role="group"
            aria-label="Filter by finish"
            className="flex shrink-0 border border-line"
          >
            {acrycoreFilters.map((option) => {
              const selected = filter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  aria-pressed={selected}
                  className={cn(
                    "flex-1 px-5 py-3 text-[0.6875rem] tracking-[0.18em] uppercase transition-colors duration-300 lg:flex-none",
                    selected
                      ? "bg-maroon text-white"
                      : "text-ink-soft hover:bg-paper-sunk hover:text-ink",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <p
          aria-live="polite"
          className="border-t border-line px-5 py-3 text-xs tracking-[0.16em] uppercase text-ink-dim lg:px-6"
        >
          Showing{" "}
          <span className="text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "colour" : "colours"}
          {filter !== "all" && <span> in {filter.toLowerCase()}</span>}
        </p>
      </div>

      {/* ---------------- Grid ---------------- */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((colour) => (
            <SwatchCard
              key={colour.id}
              colour={colour}
              onOpen={() => setActive(colour)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-paper px-6 py-24 text-center">
          <p className="font-display text-2xl font-light text-ink">
            No colours match that search.
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            Try a shade name such as &ldquo;linen&rdquo;, or a catalogue number
            such as &ldquo;99301&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="mt-8 inline-flex items-center gap-3 border border-line-strong px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-ink-soft transition-colors duration-500 hover:border-ink-dim hover:text-ink"
          >
            Clear filters
          </button>
        </div>
      )}

      <ColourDialog colour={active} onClose={() => setActive(null)} />
    </>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The catalogue hex is painted as an actual swatch here. The original page
 * printed the code as text only, which made the grid unreadable at a glance.
 */
function SwatchCard({
  colour,
  onOpen,
}: {
  colour: AcrycoreColour;
  onOpen: () => void;
}) {
  return (
    <article className="group relative flex flex-col bg-paper transition-colors duration-500 hover:bg-paper-raised">
      <div
        className="relative aspect-[5/4] w-full"
        style={{ backgroundColor: `#${colour.photoshopCode}` }}
      >
        {/* Near-white shades would otherwise dissolve into the paper canvas. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 ring-1 ring-ink/10 ring-inset"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow">{colour.catalogueCode}</p>
          <p className="text-[0.625rem] tracking-[0.18em] uppercase text-maroon">
            {colour.type}
          </p>
        </div>

        <h3 className="mt-3 font-display text-xl leading-tight font-light text-ink">
          {/* Stretched link: the whole card is the hit target, but the 3D
              link below stays independently clickable. */}
          <button
            type="button"
            onClick={onOpen}
            className="text-left after:absolute after:inset-0 after:content-['']"
          >
            {colour.productName}
            <span className="sr-only"> full specification</span>
          </button>
        </h3>

        <dl className="mt-5 space-y-0 text-sm">
          <div className="flex items-baseline justify-between gap-4 border-t border-line py-2.5">
            <dt className="text-xs tracking-[0.14em] uppercase text-ink-dim">
              Edge band
            </dt>
            <dd className="text-right text-ink-soft">{colour.edgeBandCode}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-line py-2.5">
            <dt className="text-xs tracking-[0.14em] uppercase text-ink-dim">
              RGB
            </dt>
            <dd className="font-mono text-xs text-ink-soft">
              {colour.photoshopCode}
            </dd>
          </div>
        </dl>

        <a
          href={colour.renderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 mt-auto inline-flex items-center gap-2 self-start pt-5 text-xs tracking-[0.16em] uppercase text-ink-dim transition-colors duration-300 hover:text-maroon"
        >
          3D scene
          <ExternalIcon className="h-3 w-3" />
          <span className="sr-only">for {colour.productName}, opens in a new tab</span>
        </a>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function ColourDialog({
  colour,
  onClose,
}: {
  colour: AcrycoreColour | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const open = colour !== null;

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
      {colour && (
        <motion.div
          key="colour-dialog"
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
            aria-labelledby="colour-dialog-title"
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

            <div className="grid sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
              <div
                className="relative min-h-[7rem] sm:min-h-full"
                style={{ backgroundColor: `#${colour.photoshopCode}` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 ring-1 ring-ink/10 ring-inset"
                />
              </div>

              <div className="p-6 lg:p-9">
                <p className="eyebrow flex items-center gap-3">
                  <span className="text-maroon">{colour.catalogueCode}</span>
                  <span className="h-px w-8 bg-line-strong" />
                  {colour.type}
                </p>

                <h2
                  id="colour-dialog-title"
                  className="mt-5 font-display text-3xl leading-tight font-light text-ink lg:text-4xl"
                >
                  {colour.productName}
                </h2>

                {colour.notes && (
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft text-pretty">
                    {colour.notes}
                  </p>
                )}

                <dl className="mt-8 border-t border-line">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                    <dt className="text-xs tracking-[0.16em] uppercase text-ink-dim">
                      Edge band code
                    </dt>
                    <dd className="text-sm text-ink">{colour.edgeBandCode}</dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                    <dt className="text-xs tracking-[0.16em] uppercase text-ink-dim">
                      Photoshop colour
                    </dt>
                    <dd>
                      <CopyHex value={colour.photoshopCode} />
                    </dd>
                  </div>
                </dl>

                <a
                  href={colour.renderUrl}
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

/** The hex is the one value a designer retypes most, so make it one click. */
function CopyHex({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          // Clipboard blocked (insecure context or denied permission). The
          // code stays visible and selectable, so nothing is lost.
        }
      }}
      className="group inline-flex items-center gap-2.5 font-mono text-sm text-ink transition-colors duration-300 hover:text-maroon"
    >
      {value}
      <span className="text-[0.625rem] tracking-[0.16em] uppercase text-ink-dim transition-colors duration-300 group-hover:text-maroon">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
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
