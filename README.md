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

`metrosurfaces.in` already points at Vercel, so the cutover is **never a registrar
change**. DNS stays at GoDaddy throughout.

Verified 2026-07-31:

| Record | Value | Changes on cutover? |
| --- | --- | --- |
| Nameservers | `ns31` / `ns32.domaincontrol.com` (GoDaddy) | No |
| Apex `A` | `216.198.79.1` | No. This is Vercel's shared IP, identical for every account and project |
| `www` `CNAME` | `c6102dda7d84bd62.vercel-dns-017.com` | Only on a cross-account move, where the hash is reissued |
| `MX` | none | No email to endanger |
| TTL | 600s | Propagation is about 10 minutes |

`www` is canonical: the apex 301s to it, matching `site.url` in `src/lib/site.ts`. Keep
that direction or canonical tags, the sitemap and OG cards all point at the wrong host.

#### First, work out which case you're in

The domain is bound to the **old** project. Whether that project sits in the same Vercel
account or a different one decides the whole procedure, and it has never been confirmed
from inside the dashboard. Don't guess. In `metro-surfaces-website`, go to Settings then
Domains, add `www.metrosurfaces.in`, and read the error:

| Error says | Meaning | Path |
| --- | --- | --- |
| already in use by another **project** | same account | A |
| already in use by another **Vercel account** | different account | B |

The test is non-destructive and changes nothing either way.

#### Path A: same account

Use the dashboard's move prompt, or:

```bash
npx vercel domains add metrosurfaces.in metro-surfaces-website --force
```

#### Path B: different account

`--force` will not work across accounts. Either verify ownership, or release the domain
first:

1. In the add-domain dialog, Vercel supplies a `_vercel` TXT record. Add it at GoDaddy
   (Type `TXT`, Name `_vercel`, Value as shown).
2. Wait out the TTL, then click Verify. The domain detaches from the old account. The old
   site serves right up to this moment, so downtime is small.
3. **Immediately** replace the `www` CNAME at GoDaddy with the new target Vercel shows.
   This is the real downtime window, so have the record open and ready beforehand.
4. Leave the apex `A` record alone.
5. Add the apex as a redirect to `www`.

If you control both accounts you can skip the TXT: remove the domain in the old account
at **both** the project and the account-settings level (the second is easy to miss), then
add it fresh. Faster, but downtime starts at removal rather than at verification.

#### Afterwards

Confirm the Domains tab reads "Valid Configuration" on both hosts with certificates
issued, then check the apex, `www`, a deep page and the sitemap. Finally retire the old
project so it cannot reclaim the domain, and disconnect any project wired to a fork of
this repo, or pushes there keep producing stray deployments.
