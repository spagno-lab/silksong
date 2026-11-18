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

Read the published guide at **https://spagno-lab.github.io/silksong/**. This repository is public, and GitHub Pages publishes the committed main /docs directory.

## Editing
Edit guide/*.md, rebuild, validate, and commit both sources and docs/. To refresh catalogues, clone the upstream repository at the credited revision and run `node scripts/import-catalog.mjs PATH_TO_UPSTREAM`. Review branch and timing changes manually.

## Scope and credits
“Complete” means all compatible content plus explicit planning for exclusive branches. It does not mean every possible outcome fits one save. See [full third-party credits](CREDITS.md) and [guide sources](guide/09-sources.md). Original MIT notices are preserved in licenses/. No personal saves are distributed. Full story spoilers throughout.

## Collection catalogues

- [Abilities and Silk skills](guide/catalog-abilities.md)
- [Bellhome purchases](guide/catalog-bellhome.md)
- [Bellways](guide/catalog-bellways.md)
- [Bosses and minibosses](guide/catalog-bosses.md)
- [Craftmetals](guide/catalog-craftmetals.md)
- [Crests and Eva upgrades](guide/catalog-crests.md)
- [Fleas](guide/catalog-fleas.md)
- [Hunter’s Journal](guide/catalog-huntersJournal.md)
- [Keys](guide/catalog-keys.md)
- [Maps and mapping supplies](guide/catalog-mappingSupplies.md)
- [Mask Shards](guide/catalog-maskShards.md)
- [Materium](guide/catalog-materium.md)
- [Mementos](guide/catalog-mementos.md)
- [Memory Lockets](guide/catalog-memoryLockets.md)
- [Mossberries](guide/catalog-mossberries.md)
- [Pale Oils](guide/catalog-paleOil.md)
- [Relics](guide/catalog-relics.md)
- [Silkeaters](guide/catalog-silkeaters.md)
- [Spool Fragments](guide/catalog-spoolFragments.md)
- [Wishes and objectives](guide/catalog-tasks.md)
- [Tools](guide/catalog-tools.md)
- [Upgrades](guide/catalog-upgrades.md)
- [Ventrica stations](guide/catalog-ventricaStations.md)

See [deployment details](DEPLOYMENT.md) for publishing and local preview instructions.
