# Project Gallery

Public index of selected demos. Each card opens its live demo in a new tab.

The GitHub Pages workflow publishes the gallery from `main`. The curated public entries are in `public/projects.json`. Keep the repository name, public demo URL, and title on each entry. An optional public description and approved preview image URL can accompany the title.

```sh
pnpm install --frozen-lockfile
pnpm run format:check
pnpm run typecheck
pnpm build
```
