import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WoodVeneerLibrary } from "@/components/sections/WoodVeneerLibrary";
import { pageMetadata } from "@/lib/metadata";
import { site, whatsappLink } from "@/lib/site";
import {
  woodVeneerPillars,
  woodVeneers,
  woodVeneerSpecs,
} from "@/lib/woodveneer";

const firstCode = woodVeneers[0].colourCode;
const lastCode = woodVeneers[woodVeneers.length - 1].colourCode;

export const metadata = pageMetadata({
  title: "Wood Veneer Digital Library: Acry Plus™ Colour Catalogue",
  description: `Browse all ${woodVeneers.length} Acry Plus™ wood veneer finishes, colours ${firstCode} to ${lastCode}, each with its swatch and a 3D scene. Search by the colour number printed in your folder.`,
  keywords: [
    "wood veneer finish sheets",
    "Acry Plus wood veneer",
    "wood grain decorative surface",
    "wood veneer colour catalogue",
    "interior wall panelling veneer",
  ],
  path: "/woodveneer",
  shareTitle: "Wood Veneer Digital Library",
  shareDescription: `All ${woodVeneers.length} Acry Plus™ wood veneer finishes with swatches and 3D scenes.`,
});

/** Lets search engines surface individual finishes from the catalogue. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Wood Veneer Digital Library",
  description: `The complete Acry Plus™ wood veneer catalogue: ${woodVeneers.length} finishes with swatches and 3D scenes.`,
  url: `${site.url}/woodveneer`,
  isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: woodVeneers.length,
    itemListElement: woodVeneers.map((veneer, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `Acry Plus Wood Veneer ${veneer.colourCode}`,
        sku: veneer.colourCode,
        image: `${site.url}${veneer.image}`,
        category: "Wood veneer finish",
        brand: { "@type": "Brand", name: "Acry Plus" },
      },
    })),
  },
};

export default function WoodVeneerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        eyebrow="Wood Veneer Digital Library"
        title="Every grain, with the number that carries it into your drawings."
        lead={`${woodVeneers.length} finishes, colours ${firstCode} to ${lastCode}. Search by the colour number from your Acry Plus™ folder, then open any swatch for its specification and 3D scene.`}
        compact
      />

      {/* ---------------- The library ---------------- */}
      <section
        id="library"
        className="scroll-mt-24 bg-paper-sunk pt-6 pb-24 lg:pt-8 lg:pb-32"
      >
        <div className="shell">
          <div className="border border-line bg-paper">
            <WoodVeneerLibrary />
          </div>

          <Reveal delay={0.15}>
            <p className="mt-8 text-sm text-ink-dim text-pretty">
              Screen colour is indicative only. Always confirm a finish against
              a physical Acry Plus™ sample under actual lighting conditions
              before finalising a specification.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Why Acry Plus ---------------- */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="Why Acry Plus™"
            title="A calm surface for thoughtful interiors."
            lead="Developed for interiors where restraint, balance and longevity matter. Each surface is made to stay visually stable over time, so form, light and proportion define the space."
          />

          <RevealGroup className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {woodVeneerPillars.map((pillar) => (
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

          {/* Technical snapshot */}
          <Reveal delay={0.1}>
            <div className="mt-px border border-t-0 border-line bg-paper-sunk p-8 lg:p-10">
              <p className="eyebrow">Technical snapshot</p>

              <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {woodVeneerSpecs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-xs tracking-[0.14em] uppercase text-ink-dim">
                      {spec.label}
                    </dt>
                    <dd className="mt-2 font-display text-xl font-light text-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 text-sm leading-relaxed text-ink-soft text-pretty">
                <span className="text-ink">For interior applications only.</span>{" "}
                For optimal adhesion, paste the surface with Probond glue on
                calibrated ply.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Close ---------------- */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">Acry Plus™</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.08] font-light text-balance text-ink sm:text-5xl">
                The warmth of wood. Made to stay that way.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft text-pretty">
                Tell us the colour numbers you are working with and we will
                send physical samples, confirm stock and quote for the project.
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <a
                href={whatsappLink(
                  "Hi Metro Surfaces, I would like to request Acry Plus wood veneer samples. Colour numbers: ",
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
                href="/products"
                className="group inline-flex items-center gap-3 border border-line-strong px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-ink-soft transition-colors duration-500 hover:border-ink-dim hover:text-ink"
              >
                See all products
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
