/**
 * Acry Plus™ Wood Veneer Digital Library.
 *
 * The catalogue behind /woodveneer, taken from the printed Acry Plus folder.
 * The folder gives each finish a colour number and a QR code only, no name,
 * so the colour number is the one thing a specifier can search by.
 *
 * `tone` is the swatch's average colour as a bare six-digit hex (no leading
 * #). It is painted behind the swatch image so the card holds its colour
 * while the image loads.
 */

export type WoodVeneer = {
  /** Four-digit colour number as printed in the folder, e.g. "5901". */
  colourCode: string;
  /** Swatch image, cut from the folder artwork. */
  image: string;
  /** Six-digit hex, no "#" prefix. */
  tone: string;
  /** The folder's QR code target: a 3D room scene showing the finish in situ. */
  renderUrl: string;
};

const veneer = (colourCode: string, tone: string, scene: string): WoodVeneer => ({
  colourCode,
  image: `/woodveneer/${colourCode}.webp`,
  tone,
  renderUrl: `https://dqr.cn/ouVY3a/${scene}`,
});

export const woodVeneers: WoodVeneer[] = [
  veneer("5901", "c69e75", "qCvZwlx"),
  veneer("5902", "c49f7a", "qHA7Rsh"),
  veneer("5903", "cdab81", "qZYbcYL"),
  veneer("5904", "a28d79", "qUK0MbR"),
  veneer("5905", "c7ad8f", "q7o3OYJ"),
  veneer("5906", "d0b393", "qzkVjY9"),
  veneer("5907", "937f71", "qIaCek5"),
  veneer("5908", "8e7a66", "q5r1kgS"),
  veneer("5909", "9a826e", "qxmv8u6"),
  veneer("5910", "bf926a", "qvp0Btc"),
  veneer("5911", "a36a50", "qlE9yTO"),
  veneer("5912", "c2bab0", "qnCRzEQ"),
  veneer("5913", "bab0a8", "qMMWGUl"),
  veneer("5914", "c0b3a4", "qsZibcP"),
  veneer("5915", "997361", "qJPpmN9"),
  veneer("5916", "775949", "qKXiPQm"),
  veneer("5917", "967255", "qqgylAh"),
  veneer("5918", "a2896f", "qEcLi9F"),
  veneer("5919", "dac5a7", "qY4rVpr"),
  veneer("5920", "a7a095", "q9gEF4R"),
];

/** The folder's "Material Performance For Interior Applications" page. */
export const woodVeneerPillars = [
  {
    index: "01",
    title: "Colour Stability",
    summary: "High colour stability with resistance to fading.",
  },
  {
    index: "02",
    title: "Durable Surface",
    summary:
      "Scratch and impact resistance, with moisture and chemical resistance for interior conditions.",
  },
  {
    index: "03",
    title: "Easy Fabrication",
    summary:
      "A lightweight yet rigid structure with consistent thickness and dimensional stability.",
  },
  {
    index: "04",
    title: "Low Maintenance",
    summary: "Cleans with mild soap and water, and stays that way over long-term use.",
  },
] as const;

/** The folder's "Technical Snapshot". The same values apply to every finish. */
export const woodVeneerSpecs = [
  { label: "Sheet size", value: "2440 × 1220 mm" },
  { label: "Thickness", value: "1 mm" },
  { label: "Density", value: "1.39 ± 0.03 g/cm³" },
  { label: "Colour deviation", value: "ΔE < 2.5" },
] as const;
