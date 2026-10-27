"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

/** One full-width product entry, image and copy alternating sides. */
export function ProductRow({
  product,
  flipped,
}: {
  product: Product;
  flipped: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <article
      id={product.slug}
      className="scroll-mt-28 border-b border-line py-20 last:border-b-0 lg:py-28"
    >
      <div
        className={cn(
          "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
          flipped && "lg:[&>*:first-child]:order-2",
        )}
      >
        {/* Image */}
        <div
          ref={ref}
          className="group relative aspect-[4/3] overflow-hidden border border-line"
        >
          <motion.div style={{ y: imageY }} className="absolute inset-[-8%]">
            <Image
              src={product.image}
              alt={`${product.name}, ${product.category} decorative surface supplied by Metro Surfaces`}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          </motion.div>
          {/* Paper wash under the index numeral so it stays legible on any
              photograph. The numeral sits top-left */}
          <div className="absolute inset-0 bg-gradient-to-br from-paper/85 via-transparent to-transparent" />
          <span className="absolute top-6 left-6 font-display text-5xl font-light text-ink/35">
            {product.index}
          </span>
        </div>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="eyebrow">{product.category}</p>
            <h2 className="mt-5 font-display text-4xl leading-tight font-light text-ink lg:text-5xl">
              {product.name}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft text-pretty">
              {product.description}
            </p>
          </Reveal>

          <p className="eyebrow mt-10 mb-4">Key features</p>
          <RevealGroup className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {product.features.map((feature) => (
              <RevealItem key={feature}>
                <div className="group flex h-full items-center gap-3 bg-paper px-5 py-4 transition-colors duration-500 hover:bg-paper-raised">
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-maroon-deep transition-transform duration-500 group-hover:rotate-[135deg]" />
                  <span className="text-sm text-ink-soft">{feature}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-9 flex flex-wrap gap-4">
            <a
              href={whatsappLink(
                `Hi Metro Surfaces, I would like to request samples of ${product.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-maroon px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-white transition-colors duration-500 hover:bg-maroon-deep"
            >
              Request samples
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            {product.library && (
              <Link
                href={product.library.href}
                className="group inline-flex items-center gap-3 border border-line-strong px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-ink-soft transition-colors duration-500 hover:border-maroon hover:text-maroon"
              >
                {product.library.label}
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}
            <Link
              href="/applications"
              className="group inline-flex items-center gap-3 border border-line-strong px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-ink-soft transition-colors duration-500 hover:border-ink-dim hover:text-ink"
            >
              View applications
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
