import { cn } from "@/lib/cn";

/**
 * Brand mark rebuilt as inline SVG.
 *
 * The supplied logo file was a 1600-path trace with black text, which is
 * invisible on a dark canvas and can't be recoloured reliably. This
 * reproduces the same four overlapping panels (two maroon, two ash, with
 * ash laid over maroon to create the dusty-pink intersections) as
 * clean vectors that inherit theme colours and can be animated.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 66"
      fill="none"
      aria-hidden="true"
      // Width comes only from the caller. A base `w-full` here would win on
      // CSS source order and blow the mark up to its container's width.
      className={cn("h-auto shrink-0", className)}
    >
      <rect x="13.3" y="0.5" width="39.7" height="46" fill="var(--color-maroon)" />
      <path d="M66 2 L100 11 L100 62 L66 49 Z" fill="var(--color-maroon)" />
      <path d="M1 4 L32.3 13 L32.3 62 L1 49 Z" fill="var(--color-ash)" opacity="0.8" />
      <rect x="44.6" y="19.6" width="40.9" height="46.4" fill="var(--color-ash)" opacity="0.8" />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className={compact ? "w-8" : "w-10"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans font-light tracking-tight text-ink",
            compact ? "text-lg" : "text-xl",
          )}
        >
          metro{" "}
          <span className="font-normal tracking-wide text-maroon">
            SURFACES
          </span>
        </span>
        {!compact && (
          <span className="mt-1 font-display text-[0.6875rem] italic tracking-wide text-ink-dim">
            Beautiful Spaces, Beautiful Life
          </span>
        )}
      </span>
    </span>
  );
}
