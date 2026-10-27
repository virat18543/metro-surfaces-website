import { cn } from "@/lib/cn";

/**
 * Infinite horizontal ticker. The track holds two identical copies and
 * translates by -50%, so the loop is seamless with pure CSS.
 */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const track = [...items, ...items];

  return (
    <div aria-hidden="true" className={cn("mask-fade-x overflow-hidden", className)}>
      <div className="flex w-max animate-marquee">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 px-8 font-display text-2xl font-light tracking-wide text-ink-soft sm:text-3xl"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-maroon-deep/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
