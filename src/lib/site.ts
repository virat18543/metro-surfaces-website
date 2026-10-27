/**
 * Single source of truth for business details, navigation and shared copy.
 * Edit here and it updates everywhere on the site.
 */

export const site = {
  name: "Metro Surfaces",
  tagline: "Beautiful Spaces, Beautiful Life",
  descriptor: "Premium Decorative Surfaces",
  url: "https://www.metrosurfaces.in",
  description:
    "Metro Surfaces supplies premium decorative surfaces to discerning architects and interior designers across India: Acrycore sheets, high-pressure laminates, architectural louvers and cane wallpaper.",
} as const;

export const contact = {
  phone: "+91 82865 80449",
  phoneHref: "tel:+918286580449",
  whatsapp: "https://wa.me/918286580449",
  whatsappDisplay: "+91 82865 80449",
  email: "rrrmetro@gmail.com",
  emailHref: "mailto:rrrmetro@gmail.com",
  hours: {
    days: "Monday – Saturday",
    time: "9:00 AM – 6:00 PM",
    note: "Full service and consultations available",
  },
} as const;

/**
 * WhatsApp link with a message already typed in, so the chat opens knowing
 * what the visitor wants instead of starting blank.
 */
export const whatsappLink = (message: string) =>
  `${contact.whatsapp}?text=${encodeURIComponent(message)}`;

/**
 * Social profiles. Order here is the order they render everywhere.
 * `handle` is the human-readable label shown next to the icon in list
 * layouts; the icon-only rows fall back to `label` for screen readers.
 */
export const social = [
  {
    label: "Instagram",
    handle: "@metro_surfaces",
    href: "https://www.instagram.com/metro_surfaces/",
  },
  {
    label: "Facebook",
    handle: "metrosurfaces1",
    href: "https://www.facebook.com/metrosurfaces1",
  },
  {
    label: "LinkedIn",
    handle: "Metro Surface",
    href: "https://www.linkedin.com/company/metro-surface/",
  },
] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Acrycore", href: "/acrycore" },
  { label: "Wood Veneer", href: "/woodveneer" },
  { label: "Applications", href: "/applications" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Stats band. These are deliberately limited to claims already made on the
 * existing site ("decades of experience", four product lines, Mon–Sat
 * trading). Swap in your real project count or founding year here when
 * you're ready. Nothing else needs to change.
 */
export const stats = [
  { value: 30, suffix: "+", label: "Years of industry experience" },
  { value: 4, suffix: "", label: "Specialist product lines" },
  { value: 6, suffix: " days", label: "Service window, Mon–Sat" },
] as const;
