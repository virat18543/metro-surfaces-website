import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ContactBand } from "@/components/sections/ContactBand";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { SocialLinks } from "@/components/SocialLinks";
import { pageMetadata } from "@/lib/metadata";
import { contact } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact: Talk to our surface specialists",
  shareTitle: "Contact",
  description:
    "Reach Metro Surfaces on WhatsApp, phone or email for premium decorative surface solutions. Monday to Saturday, 9:00 AM – 6:00 PM.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Ready to transform your space?"
        lead="Contact our design experts for premium decorative surface solutions. We respond fastest on WhatsApp."
      />

      <section className="shell py-16 lg:py-24">
        <ContactBand />
      </section>

      <section className="shell pb-24 lg:pb-32">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>

          <div className="grid gap-4 lg:col-span-5">
            <Reveal className="h-full">
              <div className="relative h-full overflow-hidden border border-line bg-paper-sunk p-8 lg:p-10">
                <div className="bloom pointer-events-none absolute -top-24 -right-16 h-64 w-64 opacity-70" />
                <div className="relative">
                  <p className="eyebrow">Operating hours</p>
                  <p className="mt-6 font-display text-3xl leading-tight font-light text-ink">
                    {contact.hours.days}
                  </p>
                  <p className="mt-2 font-display text-2xl font-light text-maroon">
                    {contact.hours.time}
                  </p>
                  <div className="mt-7 h-px w-12 bg-line-strong" />
                  <p className="mt-7 text-sm leading-relaxed text-ink-dim text-pretty">
                    {contact.hours.note}. Outside these hours, send a WhatsApp
                    message or email and we&apos;ll pick it up the next working
                    morning.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-line bg-paper p-8 lg:p-10">
                <p className="eyebrow">Direct lines</p>
                <ul className="mt-6 space-y-5">
                  <li>
                    <p className="text-xs tracking-[0.16em] uppercase text-ink-dim">
                      Phone
                    </p>
                    <a
                      href={contact.phoneHref}
                      className="link-underline mt-1.5 block font-display text-2xl font-light text-ink"
                    >
                      {contact.phone}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs tracking-[0.16em] uppercase text-ink-dim">
                      Email
                    </p>
                    <a
                      href={contact.emailHref}
                      className="link-underline mt-1.5 block text-lg break-all text-ink"
                    >
                      {contact.email}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border border-line bg-paper p-8 lg:p-10">
                <p className="eyebrow">Follow us</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-dim text-pretty">
                  New finishes, recent installations and what is moving in the
                  studio.
                </p>
                <SocialLinks variant="list" className="mt-7" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
