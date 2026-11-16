import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";

import { LogoMark } from "@/components/Logo";
import { SaveContactButton } from "@/components/team/SaveContactButton";
import { pageMetadata } from "@/lib/metadata";
import { contact, site, social } from "@/lib/site";
import {
  cardCatalogues,
  cardOrg,
  cardWebsite,
  displayPhone,
  findMember,
  firstName,
  initials,
  intlDigits,
  memberWhatsapp,
  team,
} from "@/lib/team";

/**
 * Personal contact card at metrosurfaces.in/<code>, the page behind each
 * person's QR code. Only the codes in src/lib/team.ts exist; anything else
 * at the root still 404s.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return team.map((member) => ({ code: member.code }));
}

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  const member = findMember(code);
  if (!member) return {};

  return {
    ...pageMetadata({
      title: `${member.name} | ${cardOrg}`,
      shareTitle: `${member.name}, ${cardOrg}`,
      description: `Contact ${member.name} at ${site.name} on WhatsApp or phone, save their number, and browse the Acrycore, Digital Emboss, Wood Veneer, Louvers and Cane Wallpaper catalogues.`,
      path: `/${member.code}`,
    }),
    // Personal cards are reached by QR code, not search.
    robots: { index: false, follow: true },
  };
}

const rise = (delay: number) => ({ "--rise-delay": `${delay}s`, "--rise-y": "16px" }) as CSSProperties;

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-line-strong text-ink-soft transition-colors duration-500 group-hover:border-maroon group-hover:text-maroon">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-[18px] w-[18px]"
      >
        {children}
      </svg>
    </span>
  );
}

const ICONS = {
  chat: <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />,
  phone: (
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19V5M9 7h6" />
    </>
  ),
};

function Row({
  href,
  icon,
  title,
  note,
  badge,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  note?: string;
  badge?: string;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative flex items-center gap-4 bg-paper px-[18px] py-[17px] transition-colors duration-700 hover:bg-paper-raised"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-maroon-deep transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      <Icon>{icon}</Icon>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[21px] leading-tight font-normal text-ink">
          {title}
          {badge && (
            <span className="ml-2 inline-block bg-maroon-tint px-[7px] py-[3px] align-[4px] font-sans text-[9.5px] font-medium tracking-[0.16em] text-maroon uppercase">
              {badge}
            </span>
          )}
        </span>
        {note && <span className="mt-0.5 block truncate text-[13px] text-ink-dim">{note}</span>}
      </span>
      <span className="text-ink-dim transition-transform duration-500 group-hover:translate-x-1 group-hover:text-maroon">
        →
      </span>
    </a>
  );
}

function Section({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="eyebrow mb-3 flex items-center gap-3">
        <span className="text-maroon">{index}</span>
        {label}
        <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
      </h2>
      {children}
    </section>
  );
}

export default async function TeamCardPage({ params }: Props) {
  const { code } = await params;
  const member = findMember(code);
  if (!member) notFound();

  const phone = displayPhone(member.mobile);
  const hi = `Hi ${firstName(member)}`;
  const catalogues = cardCatalogues.filter((item) => item.href);

  return (
    <div className="relative overflow-hidden">
      <div className="bloom pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[32rem] -translate-x-1/2 opacity-80" />

      <div className="relative mx-auto w-full max-w-[460px] px-5 pt-[104px] pb-20 lg:pt-[132px]">
        {/* Brand */}
        <header className="rise text-center" style={rise(0)}>
          <h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/acrycore-logo.png"
              alt="Acrycore"
              width={661}
              height={139}
              className="mx-auto h-auto w-[210px] max-w-[66%]"
            />
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 text-[15px] leading-none">
            <span className="mr-0.5 font-display text-[17px] text-ink-dim italic">by</span>
            <LogoMark className="w-6" />
            <span className="font-light tracking-tight text-ink">
              metro <span className="font-normal tracking-wide text-maroon">SURFACES</span>
            </span>
          </p>
          <p className="mx-auto mt-5 max-w-[360px] font-display text-lg leading-snug text-ink-soft italic text-balance">
            Premium decorative surfaces for architects and interior designers.
          </p>
          <p className="eyebrow mt-4">Mumbai · Since 1992</p>
        </header>

        {/* Person */}
        <div
          className="rise relative mt-8 flex items-center gap-4 border border-line bg-paper-raised p-[18px] shadow-[var(--shadow-card)]"
          style={rise(0.12)}
        >
          <span className="absolute inset-y-0 left-0 w-0.5 bg-maroon" />
          <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-maroon/20 bg-maroon-tint font-display text-xl font-medium tracking-wide text-maroon-deep">
            {initials(member)}
          </span>
          <div className="min-w-0">
            <p className="eyebrow">Your Metro contact</p>
            <p className="mt-1 font-display text-[26px] leading-tight font-normal text-ink">{member.name}</p>
            {member.role && <p className="text-[13px] text-ink-dim">{member.role}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="rise mt-3.5 grid grid-cols-2 gap-2.5" style={rise(0.2)}>
          <a
            href={memberWhatsapp(member, `${hi}, I'd like to become a dealer. My firm name and city: `)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center border border-maroon/20 bg-maroon-tint px-2 py-[15px] text-xs tracking-[0.16em] text-maroon-deep uppercase transition-colors duration-500 hover:border-maroon"
          >
            Become a dealer
          </a>
          <a
            href={memberWhatsapp(member, `${hi}, I'd like to request samples / a catalogue. Details: `)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center border border-line-strong px-2 py-[15px] text-xs tracking-[0.16em] text-ink-soft uppercase transition-colors duration-500 hover:border-maroon hover:text-maroon"
          >
            Request samples
          </a>
        </div>
        <div className="rise mt-2.5" style={rise(0.26)}>
          <SaveContactButton vcfPath={`/${member.code}/contact.vcf`} />
        </div>

        <Section index="01" label="Contact">
          <div className="grid gap-px border border-line bg-line">
            <Row href={memberWhatsapp(member, `${hi}, `)} icon={ICONS.chat} title="WhatsApp us" note={phone} />
            <Row href={`tel:+${intlDigits(member.mobile)}`} icon={ICONS.phone} title="Call us" note={phone} />
            <Row href={contact.emailHref} icon={ICONS.mail} title="Email" note={contact.email} />
            <Row href={cardWebsite.href} icon={ICONS.globe} title="Visit our website" note={cardWebsite.label} />
          </div>
        </Section>

        <Section index="02" label="Follow">
          <div className="grid grid-cols-3 gap-px border border-line bg-line">
            {social.map((profile) => (
              <a
                key={profile.label}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-paper px-2 py-[15px] text-center text-xs tracking-[0.14em] text-ink-soft uppercase transition-colors duration-500 hover:bg-paper-raised hover:text-maroon"
              >
                {profile.label}
              </a>
            ))}
          </div>
        </Section>

        <Section index="03" label="Catalogues">
          <div className="grid gap-px border border-line bg-line">
            {catalogues.map((item) => (
              <Row
                key={item.title}
                href={item.href}
                icon={ICONS.book}
                title={item.title}
                note={item.note}
                badge={item.isNew ? "New" : undefined}
              />
            ))}
          </div>
        </Section>

        <p className="mt-11 text-center text-xs leading-relaxed text-ink-dim">
          Dealer-only distribution across India
        </p>
      </div>
    </div>
  );
}
