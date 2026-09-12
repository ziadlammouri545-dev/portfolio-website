# Portfolio Website — Ziad.dev-ish

My personal portfolio, built with React + Vite. The hero is a live profile
card that pulls my real follower/following/repo numbers from the GitHub API.

## Run it

```bash
npm install
npm run dev     # dev server
npm run build   # static site in dist/
```

`vite.config.js` sets `base: "./"` so the build can be dropped onto GitHub
Pages without extra config.

## What's inside

- Profile card hero (avatar, live stats, tags, actions)
- "What I build" skills grid
- Projects grid linking to my public repos
- Dark terminal section with my profile as JSON
- Fully responsive, Inter typeface, emerald-on-slate palette

## Deploy

After `npm run build`, the `dist/` folder is the site. Push it to a
`gh-pages` branch (or use GitHub Pages from `dist`) and it's live.