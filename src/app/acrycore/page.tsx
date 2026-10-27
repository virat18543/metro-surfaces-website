import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { AcrycoreLibrary } from "@/components/sections/AcrycoreLibrary";
import { acrycoreColours, acrycorePillars } from "@/lib/acrycore";
import { pageMetadata } from "@/lib/metadata";
import { site, whatsappLink } from "@/lib/site";

const solidCount = acrycoreColours.filter((c) => c.type === "Solid").length;
const metallicCount = acrycoreColours.length - solidCount;

export const metadata = pageMetadata({
  title: "Acrycore™ Digital Library: Colour Catalogue for Specifiers",
  description: `Browse all ${acrycoreColours.length} Acrycore™ shades: ${solidCount} solid and ${metallicCount} metallic finishes, each with its edge band code, Photoshop colour value and 3D scene. Search by shade name or catalogue number.`,
  keywords: [
    "Acrycore colour library",
    "Acrycore catalogue codes",
    "edge band codes",
    "ASA Acrycore shades",
    "decorative surface colour chart",
  ],
  path: "/acrycore",
  shareTitle: "Acrycore™ Digital Library",
  shareDescription: `All ${acrycoreColours.length} Acrycore™ shades with edge band codes, Photoshop colour values and 3D scenes.`,
});

/** Lets search engines surface individual shades from the catalogue. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Acrycore™ Digital Library",
  description: `The complete Acrycore™ colour catalogue: ${acrycoreColours.length} shades with edge band codes, Photoshop colour values and 3D scenes.`,
  url: `${site.url}/acrycore`,
  isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: acrycoreColours.length,
    itemListElement: acrycoreColours.map((colour, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `Acrycore ${colour.productName}`,
        sku: colour.catalogueCode,
        color: `#${colour.photoshopCode}`,
        category: `${colour.type} finish`,
        description: colour.notes,
        brand: { "@type": "Brand", name: "Acrycore" },
      },
    })),
  },
};

export default function AcrycorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        eyebrow="Acrycore™ Digital Library"
        title="Every shade, with the codes that carry it into your drawings."
        lead={`${acrycoreColours.length} shades: ${solidCount} solid and ${metallicCount} metallic. Search by the shade name or catalogue number from your Acrycore™ folder, then open any swatch for its edge band, Photoshop colour value and 3D scene.`}
        compact
      />

      {/* ---------------- The library ---------------- */}
      <section
        id="library"
        className="scroll-mt-24 bg-paper-sunk pt-6 pb-24 lg:pt-8 lg:pb-32"
      >
        <div className="shell">
          <div className="border border-line bg-paper">
            <AcrycoreLibrary />
          </div>

          <Reveal delay={0.15}>
            <p className="mt-8 text-sm text-ink-dim text-pretty">
              Screen colour is indicative only. Always confirm a shade against a
              physical Acrycore™ chip before finalising a specification.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Why Acrycore ---------------- */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="Why Acrycore™"
            title="Engineered as a true performance surface."
            lead="Not a PVC compromise. Acrycore is specified where a finish has to hold its colour, its edge and its flatness for the life of the interior."
          />

          <RevealGroup className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {acrycorePillars.map((pillar) => (
              <RevealItem key={pillar.title}>
                <div className="group relative flex h-full flex-col overflow-hidden bg-paper p-8 transition-colors duration-700 hover:bg-paper-raised lg:p-9">
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-maroon-deep transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

                  <p className="eyebrow text-maroon">{pillar.index}</p>
                  <h3 className="mt-6 font-display text-2xl leading-tight font-light text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft text-pretty">
                    {pillar.summary}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Matching systems note */}
          <Reveal delay={0.1}>
            <div className="mt-px flex flex-col gap-6 border border-t-0 border-line bg-paper-sunk p-8 sm:flex-row sm:items-center lg:p-10">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-line-strong text-maroon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" y1="22" x2="12" y2="12" />
                </svg>
              </span>

              <div>
                <p className="eyebrow">Matching systems</p>
                <p className="mt-3 text-base leading-relaxed text-ink-soft text-pretty">
                  <span className="text-ink">
                    Coordinated louvers and rafters
                  </span>{" "}
                  are available in matching colour families. Every catalogue
                  shade below includes its edge band code, Photoshop RGB value
                  and a 3D render.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Close ---------------- */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">Acrycore™</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.08] font-light text-balance text-ink sm:text-5xl">
                Beautiful surfaces. Engineered to last.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft text-pretty">
                Tell us the catalogue numbers you are working with and we will
                send physical samples, confirm stock and quote for the project.
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <a
                href={whatsappLink(
                  "Hi Metro Surfaces, I would like to request Acrycore samples. Catalogue numbers: ",
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
              <Link
                href="/products#acrycore-sheets"
                className="group inline-flex items-center gap-3 border border-line-strong px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-ink-soft transition-colors duration-500 hover:border-ink-dim hover:text-ink"
              >
                About Acrycore sheets
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
