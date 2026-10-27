import type { Metadata } from "next";

import { site } from "@/lib/site";

/**
 * Per-page metadata with matching share tags.
 *
 * A page's `openGraph` replaces the layout's whole block rather than merging
 * into it, and it also drops the generated opengraph-image. Without this,
 * every shared link previewed as the home page: its title, its URL. So each
 * page restates the full set, pointing at its own path.
 */
export function pageMetadata({
  title,
  description,
  path,
  shareTitle = title,
  shareDescription = description,
  ...rest
}: {
  title: string;
  description: string;
  path: string;
  /** Shorter title for share cards, where the SEO title reads too long. */
  shareTitle?: string;
  shareDescription?: string;
} & Omit<Metadata, "title" | "description">): Metadata {
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${site.name} | ${site.tagline}`,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      url: `${site.url}${path}`,
      title: `${shareTitle} | ${site.name}`,
      description: shareDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${shareTitle} | ${site.name}`,
      description: shareDescription,
      images: [image],
    },
    ...rest,
  };
}
