import Link from "next/link";

import { GridLines } from "@/components/SectionHeading";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden">
      <div className="bloom pointer-events-none absolute top-0 left-1/2 h-[34rem] w-[42rem] -translate-x-1/2 opacity-70" />

      <div className="shell relative pt-32 pb-24">
        <GridLines className="opacity-50" />

        <div className="relative max-w-2xl">
          <div className="rise">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-10 bg-maroon-deep" />
              Error 404
            </p>
            <h1 className="mt-7 font-display text-6xl leading-[1.02] font-light text-balance text-gradient-ink lg:text-8xl">
              This surface doesn&apos;t exist.
            </h1>
            <p className="mt-7 text-base leading-relaxed text-ink-soft text-pretty">
              The page you&apos;re looking for has moved or never existed. Head
              back to the collection. Everything we supply is there.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 bg-maroon px-7 py-4 text-xs tracking-[0.2em] uppercase text-white transition-colors duration-500 hover:bg-maroon-deep"
              >
                Back home
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 border border-line-strong px-7 py-4 text-xs tracking-[0.2em] uppercase text-ink-soft transition-colors duration-500 hover:border-ink-dim hover:text-ink"
              >
                View products
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
