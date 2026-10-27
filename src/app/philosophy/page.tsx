import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Stats } from "@/components/sections/Stats";
import { Values } from "@/components/sections/Values";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Philosophy: Our Core Values",
  shareTitle: "Our Philosophy",
  description:
    "Uncompromising service, supply continuity, ethical practice and quality excellence. The principles behind how Metro Surfaces partners with architects and interior designers.",
  path: "/philosophy",
});

export default function PhilosophyPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Core Values"
        title="Principles before product."
        lead="These principles guide every interaction, every decision, and every partnership we forge."
      />

      <section className="shell py-20 lg:py-28">
        <Values detailed />
      </section>

      <Stats />

      {/* ---------------- Mission ---------------- */}
      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="bloom pointer-events-none absolute top-1/2 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 opacity-70" />

        <div className="shell relative">
          <SectionHeading
            index="05"
            eyebrow="Our Mission"
            title="To be the most trusted partner in decorative surfaces."
            center
          />

          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 max-w-3xl space-y-7 text-center">
              <p className="text-lg leading-relaxed text-ink-soft text-pretty">
                Enabling architects and designers to create extraordinary spaces
                through premium materials, exceptional service, and unwavering
                reliability.
              </p>

              <blockquote className="border-t border-line pt-10 font-display text-2xl leading-relaxed font-light text-balance text-ink italic lg:text-3xl">
                “We believe that every surface tells a story, and we&apos;re here
                to help you write yours with elegance, durability, and
                distinction.”
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
