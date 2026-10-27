import Link from "next/link";

import { LogoMark } from "@/components/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { products } from "@/lib/products";
import { contact, nav, site, whatsappLink } from "@/lib/site";


export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-deep">
      <div className="bloom pointer-events-none absolute -bottom-40 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 opacity-60" />

      <div className="shell relative pt-24 pb-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-6">Start a conversation</p>
          <h2 className="font-display text-4xl leading-[1.1] font-light text-balance text-ink sm:text-5xl lg:text-6xl">
            Every surface tells a story.
            <br />
            <span className="italic text-ink-soft">
              We&apos;re here to help you write yours.
            </span>
          </h2>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={whatsappLink("Hi Metro Surfaces, I have an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-maroon px-7 py-4 text-xs tracking-[0.2em] uppercase text-white transition-colors duration-400 hover:bg-maroon-deep"
            >
              WhatsApp us
              <span className="transition-transform duration-400 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={contact.emailHref}
              className="group inline-flex items-center gap-3 border border-line-strong px-7 py-4 text-xs tracking-[0.2em] uppercase text-ink transition-colors duration-400 hover:border-ink-dim"
            >
              Email
              <span className="transition-transform duration-400 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>

        <div className="rule my-16" />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-3">
              <LogoMark className="w-9" />
              <span className="font-sans text-lg font-light tracking-tight text-ink">
                metro{" "}
                <span className="font-normal tracking-wide text-maroon">
                  SURFACES
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-ink-dim text-pretty">
              Decorative surfaces for architectural excellence, supplied to
              discerning architects and interior designers.
            </p>
            <SocialLinks className="mt-7" />
          </div>

          <div>
            <h3 className="eyebrow mb-5">Navigate</h3>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Our Products</h3>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products#${product.slug}`}
                    className="link-underline text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={contact.phoneHref}
                  className="link-underline text-ink-soft transition-colors duration-300 hover:text-ink"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="link-underline break-all text-ink-soft transition-colors duration-300 hover:text-ink"
                >
                  {contact.email}
                </a>
              </li>
              <li className="pt-2 text-ink-dim">
                {contact.hours.days}
                <br />
                {contact.hours.time}
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized watermark anchors the footer without extra imagery */}
        <div
          aria-hidden="true"
          className="mask-fade-b pointer-events-none mt-20 select-none"
        >
          <p className="text-center font-display text-[15vw] leading-[0.8] font-light tracking-tight text-ink/[0.045]">
            metro surfaces
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-ink-dim sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="link-underline transition-colors duration-300 hover:text-ink-soft"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
