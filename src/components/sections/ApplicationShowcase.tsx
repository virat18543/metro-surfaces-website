"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { products } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Tabbed "product → space" browser: pick a surface, see it installed. */
export function ApplicationShowcase() {
  const [active, setActive] = useState(0);
  const product = products[active];

  return (
    <div>
      {/* Tabs */}
      <div className="mask-fade-x -mx-6 overflow-x-auto px-6 pb-px lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="flex min-w-max gap-2 border-b border-line lg:min-w-0">
          {products.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={cn(
                "relative px-5 py-4 text-sm font-light tracking-wide whitespace-nowrap transition-colors duration-400",
                active === i
                  ? "text-ink"
                  : "text-ink-dim hover:text-ink-soft",
              )}
            >
              <span className="mr-2.5 text-[0.7rem] text-maroon">
                {item.index}
              </span>
              {item.name}
              {active === i && (
                <motion.span
                  layoutId="showcase-tab"
                  className="absolute inset-x-0 -bottom-px h-px bg-maroon-deep"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={product.slug}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-10 grid gap-4 lg:grid-cols-12"
        >
          {/* Hero swatch */}
          <div className="group relative aspect-[4/3] overflow-hidden border border-line lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]">
            <Image
              src={product.image}
              alt={`${product.name} surface sample by Metro Surfaces`}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper from-40% via-paper/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
              <p className="eyebrow mb-3">{product.category}</p>
              <h3 className="font-display text-3xl leading-tight font-light text-ink lg:text-4xl">
                {product.name}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft text-pretty">
                {product.blurb}
              </p>
              {product.format && (
                <p className="mt-5 inline-block border border-line-strong px-3 py-1.5 text-[0.7rem] tracking-[0.16em] uppercase text-ink-soft">
                  {product.format}
                </p>
              )}
            </div>
          </div>

          {/* Installed shots */}
          <div className="grid gap-4 lg:col-span-5">
            <p className="eyebrow lg:mb-1">Application showcase</p>
            {product.applications.map((application, i) => (
              <motion.div
                key={application.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.1, ease: EASE }}
                className="group relative aspect-[16/10] overflow-hidden border border-line lg:aspect-auto lg:min-h-[14.5rem]"
              >
                <Image
                  src={application.image}
                  alt={`${product.name} used for ${application.title}, Metro Surfaces`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover opacity-95 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper from-28% via-paper/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                  <span className="h-px w-6 bg-maroon-deep transition-all duration-700 group-hover:w-10" />
                  <p className="text-sm font-light text-ink">
                    {application.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
