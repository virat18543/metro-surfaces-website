"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { findMember } from "@/lib/team";

/**
 * Renders its children everywhere except on a team card (/RRR, /JG...).
 *
 * Used for site-wide blocks that carry the company's own WhatsApp, phone or
 * email: on a team card those would point the customer away from the person
 * whose QR code they scanned.
 */
export function HideOnTeamCard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (findMember(pathname.split("/")[1] ?? "")) return null;
  return <>{children}</>;
}
