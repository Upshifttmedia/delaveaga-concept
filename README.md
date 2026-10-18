# DeLaveaga Golf Course: concept site

A concept redesign of the DeLaveaga Golf Course website (Santa Cruz, CA), built with [Astro](https://astro.build). It's a static site, so it deploys to Vercel with no setup.

> This is an unofficial proposal. It isn't affiliated with or endorsed by DeLaveaga Golf Course or the City of Santa Cruz.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
```

## Where to change things

| What | File |
| --- | --- |
| Pitch mode, crew name & contact, phone numbers, booking link | `src/config.ts` |
| Scorecard, yardages, handicaps, "how to play it" notes, episode titles | `src/data/course.ts` |
| Green fees, twilight times, discount cards | `src/data/rates.ts` |
| Homepage section order | `src/pages/index.astro` |
| Colors, fonts, layout | `src/styles/global.css` |
| Photos and logos | `public/images/` |

### Pitch mode

`pitchMode: true` in `src/config.ts` shows the "note for the DeLaveaga team" in the How to Play section and labels the site as a concept. Set it to `false` for a clean version the course could adopt.

`noindex: true` keeps search engines from indexing the concept so it never competes with the course's real site.

### Adding real flyover videos

1. Export each clip vertical (9:16), ideally MP4 (H.264), 10–15 seconds, under ~8 MB.
2. Put it in `public/videos/`, e.g. `public/videos/hole-10.mp4`.
3. In `src/data/course.ts`, set that hole's `video` to `"/videos/hole-10.mp4"`.

The flyover player plays the clip, syncs the progress bar and captions to it, and moves on to the next hole when it ends. The episode card switches to "Watch now". Holes without a clip keep the image preview.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, choose **Add New → Project**, import the repo, and accept the detected Astro settings.
3. Every push to `main` redeploys automatically; pull requests get their own preview links.

## Course data sources

- Scorecard: official DeLaveaga scorecard (tees, yardages, handicaps, ratings/slopes).
- Rates, hours, clubs and dining details: delaveagagolf.com, October 2026.
- Hole notes are written for this concept, based on the course's published course tour.

Note: the Red tee holes add up to 5,244 yards, while the scorecard's summary lists 5,099. The site shows the hole-by-hole total; confirm with the course.
