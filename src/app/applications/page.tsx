import Image from "next/image";

import { PageHero } from "@/components/PageHero";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ApplicationShowcase } from "@/components/sections/ApplicationShowcase";
import { pageMetadata } from "@/lib/metadata";
import { applicationSectors } from "@/lib/products";

export const metadata = pageMetadata({
  title: "Applications: From Product to Space",
  shareTitle: "Applications",
  description:
    "See Metro Surfaces decorative surfaces in place: corporate office paneling, residential feature walls, restaurant ceilings, partitions, exterior cladding and more.",
  path: "/applications",
});

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="From Product to Space"
        title="Where the material meets the room."
        lead="Discover how our premium decorative surfaces transform architectural visions into reality. Each product showcases endless possibilities for sophisticated interior design."
      />

      <section className="shell py-20 lg:py-28">
        <ApplicationShowcase />
      </section>

      {/* ---------------- Sectors ---------------- */}
      <section className="border-t border-line bg-paper-sunk py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="Versatile Applications"
            title="Specified across every kind of space."
          />

          <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3">
            {applicationSectors.map((sector) => (
              <RevealItem key={sector.title}>
                {/* Photograph as a band, copy on solid paper beneath. Text
                    laid over these high-key interiors needed so much veiling
                    that the image stopped reading at all */}
                <article className="group flex h-full flex-col overflow-hidden border border-line bg-paper-raised transition-shadow duration-700 hover:shadow-card">
                  <div className="relative h-52 shrink-0 overflow-hidden">
                    <Image
                      src={sector.image}
                      alt={`${sector.title}, decorative surfaces by Metro Surfaces`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover grayscale-[0.5] transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="absolute top-5 left-5 font-display text-4xl font-light text-white drop-shadow-[0_1px_6px_rgba(28,25,24,0.55)]">
                      {sector.index}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="font-display text-3xl leading-tight font-light text-ink">
                      {sector.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-dim">
                      {sector.summary}
                    </p>

                    <ul className="mt-7 space-y-px border-t border-line pt-5">
                      {sector.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 py-1.5 text-sm text-ink-soft"
                        >
                          <span className="h-1 w-1 rotate-45 bg-maroon" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Padding lives on the wrapper. On the rule itself the
                        background would fill the padding box into a block */}
                    <div className="mt-auto pt-7">
                      <span className="block h-px w-10 bg-maroon transition-all duration-700 group-hover:w-20" />
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
