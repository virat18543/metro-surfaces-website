"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";

import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/cn";
import { products } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Inline values for the CSS `rise` entrance. The hero is the first thing on
 * screen, so it animates in CSS rather than through motion: motion's start
 * state ships in the server HTML as opacity 0 and stays that way until
 * JavaScript hydrates, which on a slow phone is a blank page.
 */
const rise = (delay: number, y?: string) =>
  ({
    "--rise-delay": `${delay}s`,
    ...(y ? { "--rise-y": y } : {}),
  }) as CSSProperties;

/**
 * Split editorial hero: type on paper at left, a vertical stack of material
 * swatches at right. The two halves share one `active` index, so hovering a
 * product row opens its swatch and hovering a swatch marks its row. The
 * page introduces the catalogue instead of a generic interior photo.
 */
export function Hero() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden pt-[116px] pb-16 lg:pt-[150px] lg:pb-24">
      <div className="bloom pointer-events-none absolute -top-32 right-0 h-[22rem] w-[26rem] lg:h-[34rem] lg:w-[40rem]" />

      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------------- Left: editorial column ----------------
              min-w-0: grid items default to min-width:auto, which lets a
              wide child force the whole column past the viewport. */}
          <div className="min-w-0 lg:col-span-6 xl:col-span-7">
            <p
              style={rise(0.1, "12px")}
              className="rise eyebrow flex items-center gap-3"
            >
              <span className="h-px w-10 bg-maroon" />
              Premium Decorative Surfaces
            </p>

            <h1 className="mt-7 font-display text-[3.25rem] leading-[0.95] font-light tracking-[-0.02em] sm:text-7xl xl:text-[5.5rem]">
              <span className="block overflow-hidden">
                <span
                  style={rise(0.18, "110%")}
                  className="rise block text-gradient-ink [animation-duration:1.05s]"
                >
                  Beautiful Spaces,
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span
                  style={rise(0.3, "110%")}
                  className="rise block text-maroon italic [animation-duration:1.05s]"
                >
                  Beautiful Life
                </span>
              </span>
            </h1>

            <p
              style={rise(0.5, "16px")}
              className="rise mt-7 max-w-lg text-base leading-relaxed text-ink-soft text-pretty"
            >
              Four specialist surface lines for architects and interior
              designers who specify materials that have to hold up, visually
              and physically.
            </p>

            {/* Product index, the left-hand mirror of the swatch stack */}
            <ul
              style={rise(0.62, "0px")}
              className="rise mt-10 max-w-md border-t border-line"
            >
              {products.map((product, i) => (
                <li key={product.slug}>
                  <Link
                    href={`/products#${product.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-baseline gap-4 border-b border-line py-3 transition-colors duration-500"
                  >
                    <span
                      className={cn(
                        "text-[0.7rem] tracking-[0.2em] transition-colors duration-500",
                        active === i ? "text-maroon" : "text-ink-dim",
                      )}
                    >
                      {product.index}
                    </span>
                    <span
                      className={cn(
                        "font-display text-xl font-light transition-all duration-500 lg:text-2xl",
                        active === i
                          ? "translate-x-1 text-ink"
                          : "text-ink-soft",
                      )}
                    >
                      {product.name}
                    </span>
                    <span
                      className={cn(
                        "ml-auto h-px transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active === i ? "w-10 bg-maroon" : "w-4 bg-line-strong",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div
              style={rise(0.76, "16px")}
              className="rise mt-10 flex flex-wrap items-center gap-5"
            >
              <Magnetic>
                <Link
                  href="/products"
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-maroon px-8 py-4 text-xs tracking-[0.22em] uppercase text-white"
                >
                  <span className="absolute inset-0 -translate-x-full bg-maroon-deep transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                  <span className="relative">Explore Surfaces</span>
                  <span className="relative transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>

              <a
                href={whatsappLink(
                  "Hi Metro Surfaces, I would like to request samples.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline py-4 text-xs tracking-[0.22em] uppercase text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                Request samples
              </a>
            </div>
          </div>

          {/* ---------------- Right: swatch stack ---------------- */}
          <div className="min-w-0 lg:col-span-6 xl:col-span-5">
            {/* 2×2 on small screens. Four tiles side by side leaves each too
                narrow for its label. Vertical accordion from lg up. */}
            <div className="grid h-[26rem] grid-cols-2 gap-1.5 sm:h-[30rem] lg:flex lg:h-[34rem] lg:flex-col xl:h-[36rem]">
              {products.map((product, i) => (
                <div
                  key={product.slug}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "rise min-h-0 min-w-0 transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active === i ? "grow-[2.4]" : "grow",
                  )}
                  style={{ flexBasis: 0, ...rise(0.28 + i * 0.09) }}
                >
                  <Link
                    href={`/products#${product.slug}`}
                    onFocus={() => setActive(i)}
                    aria-label={`${product.name}, ${product.category}`}
                    className="group relative flex h-full w-full items-end overflow-hidden border border-line"
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name}, ${product.category} surface supplied by Metro Surfaces`}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1024px) 50vw, 34vw"
                      className={cn(
                        "object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active === i
                          ? "scale-105 grayscale-0"
                          : "scale-100 grayscale-[0.7]",
                      )}
                    />

                    <div
                      className={cn(
                        "absolute inset-0 transition-opacity duration-700",
                        // Solid paper base under the caption, then clearing
                        // fast so the material itself still reads
                        active === i
                          ? "bg-gradient-to-t from-paper from-30% via-paper/25 to-transparent"
                          : "bg-gradient-to-t from-paper from-42% via-paper/40 to-transparent",
                      )}
                    />

                    <span
                      className={cn(
                        "absolute inset-x-0 top-0 h-px origin-left transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active === i
                          ? "scale-x-100 bg-maroon"
                          : "scale-x-0 bg-maroon",
                      )}
                    />

                    <div className="relative w-full p-4 lg:p-5">
                      <p className="text-[0.6rem] tracking-[0.24em] text-maroon uppercase">
                        {product.index}
                      </p>
                      <p className="mt-1.5 font-display text-lg leading-tight font-light text-ink lg:text-xl">
                        {product.name}
                      </p>

                      {/* Blurb only on the open swatch, and only where there's
                          room for it. The collapsed rail is too narrow */}
                      <motion.div
                        animate={{
                          height: active === i ? "auto" : 0,
                          opacity: active === i ? 1 : 0,
                        }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="hidden overflow-hidden lg:block"
                      >
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft text-pretty">
                          {product.blurb}
                        </p>
                      </motion.div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <p
              style={rise(0.9, "0px")}
              className="rise mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] tracking-[0.16em] text-ink-dim uppercase"
            >
              {/* Claims true of all four lines. Sheet size and UV rating are
                  Acrycore's alone and sat under every swatch. */}
              <span>Four specialist lines</span>
              <span className="h-2.5 w-px bg-line-strong" />
              <span>Custom sizes on request</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
