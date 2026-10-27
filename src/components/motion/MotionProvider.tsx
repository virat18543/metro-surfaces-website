"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Honours the visitor's "reduce motion" setting for every motion animation.
 * The CSS in globals.css already covers CSS animations; this covers the JS
 * ones: slides and scale effects are dropped, and content just fades in.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
