# Deployment status

The repository is private: https://github.com/spagno-lab/silksong.

The static site is built and committed in docs/. On 18 November 2026, GitHub rejected Pages activation with HTTP 422: “Your current plan does not support GitHub Pages for this repository.” The organization uses GitHub Free.

To publish while retaining the private repository, use an eligible organization plan (GitHub Team or Enterprise), then enable Pages from main /docs in repository Settings → Pages. No visibility change has been made, and no public Pages URL is currently active.

See [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

For local use, open docs/index.html or run npm ci followed by npm run serve and visit http://localhost:4173. Use the server for consistent browser-storage behaviour between chapters. Progress is browser-local; use Export progress to back it up.

Validation completed: static build, internal site links, required map assets, 823 unique checkbox identifiers, browser search and checkbox persistence after reload. External map services and every game-data claim are not automatically tested.
