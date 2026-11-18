# Deployment

Website: https://spagno-lab.github.io/silksong/

Public repository: https://github.com/spagno-lab/silksong. Publishing source: main branch, /docs directory, GitHub Pages.

The repository was made public with its owner’s authorization on 18 November 2026. Personal game saves, decoded save data and authentication helpers are not included.

To update the website, edit guide/*.md or site/, run npm ci, npm run build and npm run check, then commit and push both sources and generated docs/ files. GitHub Pages deploys the committed output.

For local use, open docs/index.html or run npm ci followed by npm run serve and visit http://localhost:4173. Use the server for consistent browser-storage behaviour between chapters. Progress is browser-local; use Export progress to back it up.

Validation completed: static build, internal site links, required map assets, 827 unique checkbox identifiers, browser search and checkbox persistence after reload. External map services and every game-data claim are not automatically tested.
