/**
 * Team contact cards: one page per person at metrosurfaces.in/<code>.
 *
 * Each card is what a customer lands on after scanning that person's QR
 * code, so every contact action on it (WhatsApp, call, save contact) goes to
 * that person's own number, never the company line.
 *
 * To add someone: add a line to `team` below. To change a number: edit it
 * here. The page, the contact file and the static route all come from this
 * list. Codes are matched case-insensitively (src/proxy.ts), so a printed
 * /RRR also opens from /rrr.
 */

export type TeamMember = {
  /** URL code, exactly as printed: metrosurfaces.in/RRR */
  code: string;
  name: string;
  /** 10-digit Indian mobile number, digits only */
  mobile: string;
  /** Optional line under the name, e.g. "Sales, North East India" */
  role?: string;
  /** Optional personal email. The card shows an Email row only if set. */
  email?: string;
};

export const team: TeamMember[] = [
  { code: "RRR", name: "Raj Rita", mobile: "9326005195" },
  { code: "JG", name: "Jainam Gada", mobile: "8286580449" },
  { code: "JRR", name: "Jenil Rita", mobile: "8898924104" },
  { code: "R", name: "Rajesh Rita", mobile: "8898624755" },
  { code: "RPC", name: "Rohit Chhadwa", mobile: "9821777939" },
  { code: "BPG", name: "Bhavik Gala", mobile: "7219619672" },
  { code: "SJR", name: "Shruti Rita", mobile: "9372652074" },
];

/** Brand the saved contact carries: "<Name> - Acrycore by Metro" */
export const cardOrg = "Acrycore by Metro";

/** Website saved on the contact card. */
export const cardWebsite = {
  label: "www.metrosurfaces.in",
  href: "https://www.metrosurfaces.in",
};

/**
 * Catalogues shown on every card. An entry with an empty `href` is hidden,
 * so a catalogue can be listed here before its link exists.
 */
export const cardCatalogues: {
  title: string;
  note: string;
  href: string;
  isNew?: boolean;
}[] = [
  {
    title: "Acrycore",
    note: "124 colours · Metallic & Solid series",
    href: "/acrycore",
  },
  {
    title: "Digital Emboss",
    note: "Our newest collection",
    href: "https://drive.google.com/file/d/1GCWJbJN7PvPTutUEW1cAwbIaa71KBMeM/view?usp=sharing",
    isNew: true,
  },
  {
    title: "Wood Veneer",
    note: "Natural wood veneer collection",
    href: "/woodveneer",
  },
  {
    title: "Louvers",
    note: "Wall and ceiling profiles",
    href: "https://drive.google.com/file/d/1CWYDyB08pe0eAgbsVDJOd5wUKGybbZ60/view?usp=sharing",
  },
  {
    title: "Cane Wallpaper",
    note: "Natural textures for walls",
    href: "https://drive.google.com/file/d/1UPs7dyC2KweIJirhJWlQT6f3-0fhv8pw/view?usp=sharing",
  },
  { title: "Laminates", note: "High-pressure decorative laminates", href: "" },
];

export function findMember(code: string): TeamMember | undefined {
  const wanted = code.toLowerCase();
  return team.find((member) => member.code.toLowerCase() === wanted);
}

/** "+91 93260 05195" */
export function displayPhone(mobile: string): string {
  return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
}

/** "919326005195", for wa.me and tel: links */
export function intlDigits(mobile: string): string {
  return `91${mobile}`;
}

export function firstName(member: TeamMember): string {
  return member.name.split(/\s+/)[0];
}

export function initials(member: TeamMember): string {
  return member.name
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function memberWhatsapp(member: TeamMember, message: string): string {
  return `https://wa.me/${intlDigits(member.mobile)}?text=${encodeURIComponent(message)}`;
}

/** vCard 3.0, CRLF line endings as the spec requires. */
export function memberVcard(member: TeamMember, socialHrefs: { label: string; href: string }[]): string {
  const contactName = `${member.name} - ${cardOrg}`;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:;${contactName};;;`,
    `FN:${contactName}`,
    `ORG:${cardOrg}`,
    member.role ? `TITLE:${member.role}` : "",
    `TEL;TYPE=CELL,VOICE:+${intlDigits(member.mobile)}`,
    member.email ? `EMAIL;TYPE=WORK:${member.email}` : "",
    `URL:${cardWebsite.href}`,
    ...socialHrefs.map((s) => `X-SOCIALPROFILE;TYPE=${s.label.toLowerCase()}:${s.href}`),
    "NOTE:Premium decorative surfaces since 1992. Acrycore, Digital Emboss, Wood Veneer, Louvers, Cane Wallpaper.",
    "END:VCARD",
  ].filter(Boolean);
  return lines.join("\r\n") + "\r\n";
}
