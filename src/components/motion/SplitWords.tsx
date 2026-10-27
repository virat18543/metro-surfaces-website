"use client";

import { motion } from "motion/react";
import { Fragment, type CSSProperties } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Reveals a heading word-by-word, each word sliding up out of a clipped box.
 *
 * Real space text nodes sit between the words rather than margin-only
 * spacing, so the heading still reads as a normal sentence to crawlers,
 * screen readers and anyone copying the text.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /**
   * Play on load through the CSS `rise` animation instead of on scroll. For
   * headings already on screen at load: the motion version stays hidden
   * until JavaScript hydrates.
   */
  immediate?: boolean;
}) {
  const words = text.split(" ");

  if (immediate) {
    return (
      <span className={className}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
              <span
                className="rise inline-block [animation-duration:0.95s]"
                style={
                  {
                    "--rise-y": "115%",
                    "--rise-delay": `${delay + i * stagger}s`,
                  } as CSSProperties
                }
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "115%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.95, ease: EASE },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
