# Metro Surfaces Website

Rebuild of [metrosurfaces.in](https://www.metrosurfaces.in) as a Next.js site with a
"warm editorial minimal" theme drawn from the brand mark: deep maroon and warm greys
on a bone paper canvas.

The home page leads with a split editorial hero (type on the left, a linked stack of
material swatches on the right) rather than a full-bleed photo banner. Hovering a
product row opens its swatch and vice versa; both halves read from the same
`products` array.

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

To check the production build:

```bash
npm run build
```

## Where to edit things

Almost everything you'll want to change lives in two files. No component editing needed.

| What | File |
| --- | --- |
| Phone, WhatsApp, email, hours, nav, stats | `src/lib/site.ts` |
| Products, features, values, application sectors, specs | `src/lib/products.ts` |

Everything else reads from those. Change the phone number in `site.ts` and it updates
the header, footer, contact page, floating WhatsApp button and enquiry form at once.

### Alternate URL spellings

Next serves routes case sensitively and only at the exact path, so `/Acrycore` and the
dropped-A `/crycore` would each 404 on their own. `src/middleware.ts` redirects both,
in any casing, to `/acrycore`. Add a line to the `aliases` map there to point another
misspelling or old URL at a live page. Keys are lowercase and matched against the
lowercased request, so one entry covers every capitalisation of it.

They redirect rather than each serving their own copy of the page, so the catalogue
keeps one canonical URL and its search ranking stays on `/acrycore`. Aliases stay out
of `sitemap.ts` for the same reason.

### Swapping images

Images live in `public/`. Replace a file with your own of the same name and it appears
everywhere that product is shown:

```
public/hero-ambient.webp          # unused since the banner was replaced; kept as a spare
public/products/acrycore.webp     # Acrycore Sheets
public/products/laminates.webp    # Premium Laminates
public/products/louvers.webp      # Decorative Louvers
public/products/cane.webp         # Cane Wallpaper
public/applications/*.webp        # installed / in-situ shots
```

Keep replacements as WebP and under ~300 KB. The originals pulled from the old
site were 2.5 MB PNGs; they're now 68–156 KB with no visible loss.

Or point `image:` in `src/lib/products.ts` at a new filename.

## Structure

```
src/
  app/                 route per page + sitemap, robots, favicon, OG image
  components/
    motion/            Reveal, SplitWords, Magnetic, Counter (animation primitives)
    sections/          Hero, ProductShowcase, ApplicationShowcase, Values, Stats, ...
    Header · Footer · Logo · Marquee · SmoothScroll · WhatsAppFab
  lib/                 site.ts (business details) · products.ts (catalogue) · cn.ts
```

## Notes

- **Brand mark** is inline SVG in `src/components/Logo.tsx`, rebuilt as clean vectors so
  it inherits theme colours. The original supplied file is kept at `public/logo.svg`
  (a 1600-path trace, not reliably recolourable).
- **Theme tokens** all live in the `@theme` block of `src/app/globals.css`: `paper-*`
  for surfaces, `ink-*` for text, `maroon*` for the accent. Components reference only
  those names, so the palette can be retuned in one file.
- **Imagery on a light canvas** takes a caption band, not a full veil: these product
  photographs are high-key, and a paper scrim across the whole image bleaches it. Text
  over a photo sits on a `from-paper from-N%` gradient base instead.
- **Enquiry form** (`/contact`) has no backend. It composes a structured message and
  hands it to WhatsApp or the visitor's mail client. Nothing is stored or transmitted
  by the site itself.
- **Motion** respects `prefers-reduced-motion`. Smooth scroll never starts and
  animations collapse to near-instant for visitors who ask for less movement.
- **TypeScript 7** ships a native compiler without the legacy API Next reads directly,
  so `next.config.ts` enables `experimental.useTypeScriptCli` to type-check via the CLI.

## Deploying

Live at https://metro-surfaces-website.vercel.app. Vercel builds every push to `main`.

The site builds to fully static pages, so it works on any host. Update `site.url` in
`src/lib/site.ts` if the domain ever changes. It drives canonical URLs, the sitemap
and social share cards.

### Commits must be authored by `jenilrita246-lab`

Vercel refuses to build a push whose **git commit author** isn't a member of the
project's team, failing with:

> Git author &lt;name&gt; must have access to the project on Vercel to create deployments.

Nothing reaches the build step when this happens, so it looks like a broken build but
is purely authorization. Set the author for this repo after any fresh clone:

```bash
git config user.name "jenilrita246-lab" && git config user.email "260600634+jenilrita246-lab@users.noreply.github.com"
```

This lives in `.git/config`, which is not committed, so a new clone silently reverts to
your global identity. Check a deploy with:

```bash
gh api repos/jenilrita246-lab/metro-surfaces-website/commits/$(git rev-parse HEAD)/status --jq '.state'
```

### The custom domain

`metrosurfaces.in` already points at Vercel. DNS is held at **GoDaddy**
(`ns31/ns32.domaincontrol.com`), with the apex `A` on `216.198.79.1` and `www` CNAMEd to
a Vercel target. It is bound to the **old** project in the same Vercel team.

So the cutover is a **move between projects**, not a registrar change. Adding a domain
that's already bound elsewhere returns `409 Conflict`, so use the dashboard's move
prompt, or:

```bash
npx vercel domains add metrosurfaces.in metro-surfaces-website --force
```

Afterwards check the project's Domains tab reads "Valid Configuration"; the `www` CNAME
target is project-specific and can be reissued on a move. There are no MX records on the
domain, so email is not at risk.

<!-- Deploy test: first push to virat18543/metro-surfaces-website (2026-10-27). -->
