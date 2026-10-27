import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductRow } from "@/components/sections/ProductRow";
import { pageMetadata } from "@/lib/metadata";
import { products, specifications } from "@/lib/products";

export const metadata = pageMetadata({
  title: "Products: Acrycore, Laminates, Louvers & Cane Wallpaper",
  shareTitle: "Products",
  description:
    "Explore the Metro Surfaces collection: UV-resistant ASA Acrycore sheets, high-pressure decorative laminates, architectural louvers and natural cane wallpaper. Custom sizes on request.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Product Collection"
        title="Surfaces selected for architectural excellence."
        lead="Discover our comprehensive collection of decorative surfaces, each meticulously selected for architectural excellence and lasting performance."
      />

      <div className="shell">
        {products.map((product, i) => (
          <ProductRow
            key={product.slug}
            product={product}
            flipped={i % 2 === 1}
          />
        ))}
      </div>

      {/* ---------------- Specifications ---------------- */}
      <section className="border-t border-line bg-paper-sunk py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            index="05"
            eyebrow="Technical Data"
            title="Standard specifications."
            lead="All products meet industry standards with customization options available for specific project requirements."
          />

          <RevealGroup className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2">
            {specifications.map((group) => (
              <RevealItem key={group.title}>
                <div className="h-full bg-paper p-8 lg:p-10">
                  <h3 className="font-display text-2xl font-light text-ink">
                    {group.title}
                  </h3>
                  <dl className="mt-7 space-y-0">
                    {group.rows.map(([term, detail]) => (
                      <div
                        key={term}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4 last:border-b-0"
                      >
                        <dt className="text-xs tracking-[0.16em] uppercase text-ink-dim">
                          {term}
                        </dt>
                        <dd className="text-sm text-ink">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <p className="mt-8 text-sm text-ink-dim">
              Need something outside these ranges? Custom sizes and finishes are
              available on request. Talk to us about the project.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
