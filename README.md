# Vijaysreeram & Suganthini — Wedding Invitation

A single-page animated wedding invitation.

**Muhurtham** · Sunday, 15 November 2026 · 6:00 – 7:00 AM
**Reception** · Saturday, 14 November 2026 · 6:00 PM onwards
**Venue** · Sri Rudhram Mahal, Pethappampati Rd, Kurunjeri, Tamil Nadu 642154

## Contents

```
site/
  index.html              the invitation — blush watercolour, no build step
  v1/index.html           earlier maroon & gold version, kept for reference
  img/                    photos, backdrops and the VS monogram
  img/hero1..3.jpg        the three hero photos that slide horizontally
  img/vs-logo.png         V&S monogram, dark gold (light backgrounds)
  img/vs-logo-light.png   V&S monogram, pale gold (dark backgrounds)
  img/vs-icon.png         browser tab icon
vercel.json               serves site/ with long cache headers on img/
```

## Running locally

```bash
python3 -m http.server 8777 --directory site
```

Then open http://localhost:8777/. Add `#open` to skip the envelope. The earlier
maroon version is at http://localhost:8777/v1/.

## Deploying

Live at **https://vijaysreeram-weds-suganthini.vercel.app**

Hosted on Vercel from this repo — `vercel.json` sets `outputDirectory` to
`site`, so there is nothing to configure and no build step to run. Every push
to `main` redeploys.

If Vercel does not pick up `vercel.json`, set **Root Directory** to `site` in
Project Settings instead.

## Still to do

- **Photos.** `bloom.jpg` and `sky.jpg` are Creative Commons images from
  Wikimedia Commons. Swap them for your own when you have them.
- **Watermarks.** Photos 4 and 5 (Ceremonies, Venue) carry another
  photographer's watermark. Replace them with your own before sharing.
- **Shared album.** The "Add Your Photos" button points at a placeholder
  `photos.google.com` link — swap in the real shared-album URL.
- **Wishes & song requests.** These currently save to each visitor's own browser
  (localStorage). To collect them centrally, POST the same fields to a form
  service from the marked spot in the script at the bottom of `index.html`.
