# Recit website

The website for **Recit – Screen Recorder & Video Editor** (Android), by JJ Studios. Plain HTML, CSS
and a little JavaScript: no build step, no frameworks, no backend. Hosted free on GitHub Pages.

| Page | Address |
| --- | --- |
| Home | https://kishors316.github.io/recit/ |
| Privacy Policy | https://kishors316.github.io/recit/privacy.html |
| Terms & Conditions | https://kishors316.github.io/recit/terms.html |

Use the Privacy Policy address in Google Play Console (**Policy and programs → App content →
Privacy policy**) and the home page as the app's website (**Grow users → Store presence → Store
settings → Website**).

## Turn on GitHub Pages (once)

1. Open the repository on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**, then **Save**.
4. After a minute or two the site is live at https://kishors316.github.io/recit/ (the Pages
   settings page shows the address and a **Visit site** button). Every push to `main` updates it.

## What's where

```
index.html          Home page: features, editor, screenshots, FAQ, support
privacy.html        Privacy Policy (its own address, for Google Play)
terms.html          Terms & Conditions (its own address)
404.html            Shown for any address that doesn't exist
assets/css/style.css  All styles (colours and sizes are variables at the top)
assets/js/main.js     Menu, scroll effects, screenshot buttons, support email (settings at the top)
assets/img/         Logo (recit-icon.svg), icons (icons.svg), screenshots, social image
assets/fonts/       Manrope web fonts and their licence (SIL OFL)
app-ads.txt (Start.io), robots.txt, sitemap.xml, favicon.*, apple-touch-icon.png, .nojekyll
```

Every page works without JavaScript; the script only adds the menu, animations and the email link.

## Common updates

**Support email.** In `assets/js/main.js`, set `email` in `SITE`, for example
`email: "support@example.com"`. Every "Email" spot on the three pages becomes a link to it. While it's
empty, they point people to the contact email on Recit's Google Play page.

**Google Play link.** `playUrl` in `SITE` (the pages also contain the link directly, so it works
without JavaScript; search for `play.google.com` to change those too).

**Screenshots.** Replace the files in `assets/img/screens/` (gallery, 540 × 960 WebP) and
`assets/img/features/` (editor rows, 720 × 992 WebP), keeping the names. The hero phone shows
`assets/img/screen-record.webp` (a phone screen, 540 × 1152). To convert a PNG:
`cwebp -q 80 -resize 540 960 in.png -o out.webp`, or any image editor that saves WebP.

**Text.** Edit the HTML directly; each section is marked with a comment (`<!-- Editor -->`, ...).

**Legal pages.** Update the text and the "Effective date" / "Last updated" lines at the top, and the
`<lastmod>` dates in `sitemap.xml`. Review both pages whenever the app gains a new permission, SDK or
service (for example sign-in or subscriptions).

**Colours.** The variables at the top of `style.css` (`--accent`, `--accent-strong`, `--bg`, ...).

**Preview locally.** From the folder that contains `recit/`: `python3 -m http.server`, then open
http://localhost:8000/recit/. (The custom 404 page only works on GitHub Pages.)

## Notes

- **app-ads.txt:** this repository keeps a copy (from Start.io's portal) at `/recit/app-ads.txt`,
  but ad crawlers only read it at the root of the domain, `https://kishors316.github.io/app-ads.txt`.
  That address is served by a repository named `Kishors316.github.io`; put the same file there
  whenever Start.io's list changes. With a custom domain for this site, this repository's copy would
  be at the root and become the live one.
- **Custom domain:** add it under Settings → Pages → Custom domain. Then update the absolute
  addresses in the `<head>` of each page, `robots.txt`, `sitemap.xml`, and the `/recit/` paths in
  `404.html`.
- **Licence:** the code is under the MIT licence in `LICENSE`. The Recit name, logo and app
  screenshots belong to JJ Studios. Manrope is under the SIL Open Font License
  (`assets/fonts/OFL.txt`).
