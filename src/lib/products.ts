export type Product = {
  slug: string;
  index: string;
  name: string;
  category: string;
  blurb: string;
  description: string;
  features: string[];
  /** Swatch tones used for the CSS-rendered material texture fallback. */
  tone: [string, string];
  image: string;
  applications: { title: string; image: string }[];
  /**
   * Size or supply format, shown as a badge in the application showcase.
   * Left out where no single format applies.
   */
  format?: string;
  /** Optional colour catalogue for this line, shown as a third CTA. */
  library?: { href: string; label: string };
};

export const products: Product[] = [
  {
    slug: "acrycore-sheets",
    index: "01",
    name: "Acrycore Sheets",
    category: "ASA Acrycore",
    blurb: "Weather-resistant decorative surfaces with exceptional durability.",
    description:
      "Weather-resistant decorative surfaces with exceptional durability and UV stability. Perfect for both interior and exterior applications, Acrycore holds its finish where lesser materials chalk, fade or delaminate.",
    features: [
      "UV Resistant",
      "Weather Proof",
      "8×4 feet standard",
      "Multiple finishes",
    ],
    tone: ["#6b4a3a", "#2a1d18"],
    image: "/products/acrycore.webp",
    format: "8 × 4 feet available",
    applications: [
      { title: "Corporate Office Paneling", image: "/applications/office-paneling.webp" },
      { title: "Residential Feature Wall", image: "/applications/residential-wall.webp" },
    ],
    library: { href: "/acrycore", label: "Browse all colours" },
  },
  {
    slug: "premium-laminates",
    index: "02",
    name: "Premium Laminates",
    category: "High Pressure",
    blurb: "High-pressure laminates with superior performance and finish.",
    description:
      "High-pressure decorative laminates offering superior performance and aesthetic appeal for commercial and residential projects. Built to take daily contact and still read as new years later.",
    features: [
      "High Pressure",
      "Scratch Resistant",
      "Easy Maintenance",
      "Wide Design Range",
    ],
    tone: ["#7a6752", "#2b241c"],
    image: "/products/laminates.webp",
    format: "8 × 4 feet available",
    applications: [
      { title: "Retail Fit-Out", image: "/applications/office-paneling.webp" },
      { title: "Hospitality Interiors", image: "/applications/residential-wall.webp" },
    ],
  },
  {
    slug: "decorative-louvers",
    index: "03",
    name: "Decorative Louvers",
    category: "Architectural",
    blurb: "Louver systems combining function with architectural presence.",
    description:
      "Architectural louver systems combining functionality with aesthetic excellence for modern commercial and residential spaces. Rhythm, shadow and acoustic softening in a single detail.",
    features: [
      "Architectural Grade",
      "Custom Spacing",
      "Multiple Materials",
      "Easy Installation",
    ],
    tone: ["#8a7a63", "#241e18"],
    image: "/products/louvers.webp",
    applications: [
      { title: "Restaurant Ceiling Feature", image: "/applications/restaurant-ceiling.webp" },
      { title: "Office Partition System", image: "/applications/office-paneling.webp" },
    ],
  },
  {
    slug: "cane-wallpaper",
    index: "04",
    name: "Cane Wallpaper",
    category: "Natural Texture",
    blurb: "Organic woven texture for contemporary interiors.",
    description:
      "Natural texture wallpaper solutions bringing organic elegance to contemporary interior design projects. The warmth of hand-woven cane, delivered as a surface you can specify by the roll.",
    features: [
      "Natural Texture",
      "Eco-Friendly",
      "Easy Application",
      "Durable Finish",
    ],
    tone: ["#a08a63", "#2e2519"],
    image: "/products/cane.webp",
    format: "Supplied by the roll",
    applications: [
      { title: "Boutique Hotel Lobby", image: "/applications/residential-wall.webp" },
      { title: "Residential Feature Wall", image: "/applications/restaurant-ceiling.webp" },
    ],
  },
];

export const values = [
  {
    index: "01",
    title: "Uncompromising Service",
    summary:
      "Every client interaction reflects our commitment to excellence, from initial consultation to project completion. We believe that exceptional service builds lasting relationships.",
    delivery: [
      "Dedicated account management",
      "Technical support and guidance",
      "Timely project delivery",
      "Post-installation assistance",
    ],
  },
  {
    index: "02",
    title: "Supply Continuity",
    summary:
      "Reliable partnerships built on consistent quality and dependable delivery schedules that architects and designers can trust without compromise.",
    delivery: [
      "Maintained inventory levels",
      "Backup supplier networks",
      "Quality consistency monitoring",
      "Predictable delivery schedules",
    ],
  },
  {
    index: "03",
    title: "Ethical Practice",
    summary:
      "Transparent processes, honest communication, and sustainable business practices guide every decision we make in our journey towards excellence.",
    delivery: [
      "Transparent pricing models",
      "Honest product specifications",
      "Sustainable sourcing practices",
      "Fair partnership agreements",
    ],
  },
  {
    index: "04",
    title: "Quality Excellence",
    summary:
      "Uncompromising standards in material selection, testing, and delivery. We partner only with manufacturers who share our commitment to superior quality.",
    delivery: [
      "Rigorous quality testing protocols",
      "Certified material standards",
      "Regular supplier audits",
      "Continuous improvement processes",
    ],
  },
];

export const applicationSectors = [
  {
    index: "01",
    title: "Commercial Spaces",
    summary: "Professional environments",
    items: ["Offices", "Retail", "Hotels", "Healthcare"],
    image: "/applications/office-paneling.webp",
  },
  {
    index: "02",
    title: "Residential Projects",
    summary: "Sophisticated home interiors",
    items: ["Living rooms", "Kitchens", "Bedrooms", "Feature walls"],
    image: "/applications/residential-wall.webp",
  },
  {
    index: "03",
    title: "Architectural Elements",
    summary: "Structural and decorative components",
    items: ["Exterior cladding", "Interior panels", "Ceilings", "Partitions"],
    image: "/applications/restaurant-ceiling.webp",
  },
];

export const specifications = [
  {
    title: "Sheet Dimensions",
    rows: [
      ["Standard", "8×4 feet (2440×1220 mm)"],
      ["Thickness", "0.5 mm to 3 mm"],
      ["Custom sizes", "Available on request"],
    ],
  },
  {
    title: "Quality Standards",
    rows: [
      ["Weather resistance", "Tested"],
      ["Fire safety", "Compliant"],
    ],
  },
];
