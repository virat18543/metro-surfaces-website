import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { contact, whatsappLink } from "@/lib/site";

const channels = [
  {
    label: "WhatsApp",
    note: "Quick responses for immediate project needs",
    value: contact.whatsappDisplay,
    href: whatsappLink("Hi Metro Surfaces, I have an enquiry."),
    external: true,
    icon: (
      <path d="M12.05 2A9.94 9.94 0 002.1 11.94a9.86 9.86 0 001.33 4.96L2 22l5.23-1.4a9.93 9.93 0 004.82 1.24h.01a9.94 9.94 0 009.94-9.94A9.94 9.94 0 0012.05 2zm5.4 14.02c-.24.68-1.4 1.3-1.96 1.38-.5.08-1.14.11-1.84-.11a16.3 16.3 0 01-1.66-.62c-2.92-1.26-4.83-4.2-4.98-4.4-.14-.19-1.19-1.57-1.19-3s.75-2.13 1.02-2.42c.26-.3.58-.37.77-.37h.56c.18 0 .42-.07.66.5.24.58.82 2 .9 2.15.07.14.12.31.02.5-.1.2-.15.31-.29.48l-.44.51c-.14.14-.29.3-.12.59.16.29.73 1.2 1.56 1.94 1.07.95 1.98 1.25 2.26 1.39.29.14.45.12.62-.07.17-.2.71-.83.9-1.11.19-.29.38-.24.64-.15.26.1 1.66.79 1.94.93.29.14.48.22.55.34.07.12.07.68-.17 1.35z" />
    ),
  },
  {
    label: "Email",
    note: "Detailed inquiries and project specifications",
    value: contact.email,
    href: contact.emailHref,
    external: false,
    icon: (
      <path d="M3 5.5h18a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1v-11a1 1 0 011-1zm1.6 2L12 12.9l7.4-5.4H4.6zM4 9.1v7.4h16V9.1l-7.4 5.4a1 1 0 01-1.2 0L4 9.1z" />
    ),
  },
  {
    label: "Call",
    note: `${contact.hours.days} · ${contact.hours.time}`,
    value: contact.phone,
    href: contact.phoneHref,
    external: false,
    icon: (
      <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.6a1 1 0 01-.25 1l-2.22 2.2z" />
    ),
  },
];

export function ContactBand() {
  return (
    <RevealGroup className="grid gap-px border border-line bg-line lg:grid-cols-3">
      {channels.map((channel) => (
        <RevealItem key={channel.label}>
          <a
            href={channel.href}
            {...(channel.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group relative flex h-full flex-col justify-between overflow-hidden bg-paper p-8 transition-colors duration-700 hover:bg-paper-raised lg:p-10"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-maroon-deep transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center border border-line-strong text-ink-soft transition-colors duration-500 group-hover:border-maroon group-hover:text-maroon">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  {channel.icon}
                </svg>
              </span>

              <h3 className="mt-7 font-display text-2xl font-light text-ink">
                {channel.label}
              </h3>
              <p className="mt-2 text-sm text-ink-dim text-pretty">
                {channel.note}
              </p>
            </div>

            <p className="mt-10 flex items-center gap-3 text-sm break-all text-ink-soft transition-colors duration-500 group-hover:text-ink">
              {channel.value}
              <span className="shrink-0 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </p>
          </a>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
