# Hollow Knight: Silksong — The Completionist’s Field Guide

An English, full-spoiler guide to a thorough playthrough, with missable-event checkpoints, compatible endings, optional duels, NPC branches, courier maps and searchable collection checklists.

## Read
- Start with [the guide](guide/01-start-here.md).
- Review [irreversible checkpoints](guide/02-checkpoints.md) before advancing.
- Follow [the ending sequence](guide/05-endings.md).
- Browse the HTML edition by opening docs/index.html, or run the local server below.

## Website
The static HTML edition includes full-text search, persistent checklists, per-chapter progress, progress export/import, responsive navigation and a print layout. No account, analytics or game-save upload is required. Checklist data stays in the browser; export it before moving devices or clearing storage.

`npm ci`, then `npm run build` and `npm run check`. Run `npm run serve` and visit http://localhost:4173. Built output is committed under docs/ and needs no server runtime.

For GitHub Pages select main /docs. A private organization repository requires GitHub Team or Enterprise; the repository must remain private unless its owner explicitly changes that requirement.

## Editing
Edit guide/*.md, rebuild, validate, and commit both sources and docs/. To refresh catalogues, clone the upstream repository at the credited revision and run `node scripts/import-catalog.mjs PATH_TO_UPSTREAM`. Review branch and timing changes manually.

## Scope and credits
“Complete” means all compatible content plus explicit planning for exclusive branches. It does not mean every possible outcome fits one save. See [sources and credits](guide/09-sources.md). No personal saves are distributed. Full story spoilers throughout.
