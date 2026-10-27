import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/metadata";
import { contact } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Metro Surfaces collects, uses, shares and protects the personal information you provide through this website.",
  path: "/privacy-policy",
  robots: { index: true, follow: true },
});

const sections: { title: string; intro?: string; items?: string[]; body?: string }[] = [
  {
    title: "Information We Collect",
    intro:
      "Metro Surfaces collects information you provide directly to us, such as when you:",
    items: [
      "Fill out contact forms or inquiry forms on our website",
      "Request product samples or catalogs",
      "Subscribe to our newsletters or updates",
      "Contact us via email, phone, or WhatsApp",
      "Participate in surveys or provide feedback",
    ],
  },
  {
    title: "How We Use Your Information",
    intro: "We use the information we collect to:",
    items: [
      "Respond to your inquiries and provide customer support",
      "Process and fulfill your requests for product information",
      "Send you product catalogs, samples, and technical documentation",
      "Provide updates about our products and services",
      "Improve our website and customer experience",
      "Comply with legal obligations and protect our rights",
    ],
  },
  {
    title: "Information Sharing",
    intro:
      "Metro Surfaces does not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
    items: [
      "With your explicit consent",
      "To fulfill your requests (e.g., shipping samples to your address)",
      "To comply with legal requirements or protect our legal rights",
      "With trusted service providers who assist in our operations",
    ],
  },
  {
    title: "Data Security",
    body: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Cookies and Tracking",
    intro:
      "Our website may use cookies and similar tracking technologies to:",
    items: [
      "Remember your preferences and settings",
      "Analyze website traffic and usage patterns",
      "Improve website functionality and user experience",
    ],
    body: "You can control cookie settings through your browser preferences.",
  },
  {
    title: "Your Rights",
    intro: "You have the right to:",
    items: [
      "Access the personal information we hold about you",
      "Request correction of inaccurate information",
      "Request deletion of your personal information",
      "Opt-out of marketing communications",
      "Object to certain processing of your information",
    ],
  },
  {
    title: "Retention Period",
    body: "We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements.",
  },
  {
    title: "Third-Party Links",
    body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.",
  },
  {
    title: "Children's Privacy",
    body: "Our services are not directed to children under 18 years of age. We do not knowingly collect personal information from children under 18. If we learn that we have collected information from a child under 18, we will delete that information promptly.",
  },
  {
    title: "Changes to This Policy",
    body: 'We may update this Privacy Policy from time to time. When we make changes, we will update the "Last updated" date at the top of this policy. We encourage you to review this policy periodically to stay informed about how we protect your information.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Last updated: December 2024"
        title="Privacy Policy"
        lead="How we handle the information you share with us."
      />

      <section className="shell py-20 lg:py-28">
        <div className="max-w-3xl">
          {sections.map((section, i) => (
            <Reveal key={section.title} className="border-b border-line py-10 first:pt-0">
              <div className="flex gap-6">
                <span className="hidden shrink-0 font-display text-2xl font-light text-ink/20 sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-2xl leading-tight font-light text-ink lg:text-3xl">
                    {section.title}
                  </h2>

                  {section.intro && (
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft text-pretty">
                      {section.intro}
                    </p>
                  )}

                  {section.items && (
                    <ul className="mt-5 space-y-2.5">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-ink-soft"
                        >
                          <span className="mt-[0.55em] h-1 w-1 shrink-0 rotate-45 bg-maroon-deep" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.body && (
                    <p className="mt-5 text-sm leading-relaxed text-ink-soft text-pretty">
                      {section.body}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal className="py-10">
            <div className="flex gap-6">
              <span className="hidden shrink-0 font-display text-2xl font-light text-ink/20 sm:block">
                {String(sections.length + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-2xl leading-tight font-light text-ink lg:text-3xl">
                  Contact Us
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft text-pretty">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>

                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="text-xs tracking-[0.16em] uppercase text-ink-dim">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={contact.emailHref}
                        className="link-underline break-all text-ink"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.16em] uppercase text-ink-dim">
                      WhatsApp
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-ink"
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.16em] uppercase text-ink-dim">
                      Business hours
                    </dt>
                    <dd className="mt-1 text-ink">
                      {contact.hours.days}, {contact.hours.time}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
