# Loom Documentation

Documentation site for the [Loom](https://github.com/LoomHubDev/loom) versioning system, built with [VitePress](https://vitepress.dev/).

## Development

```bash
npm install
npm run dev
```

The docs site runs at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Structure

```
docs/
  index.md              # Landing page
  loom/
    01-vision.md        # Why Loom exists
    02-technical-architecture.md
    03-project-setup.md
    04-data-models.md
    05-storage-schema.md
    06-systems/         # Deep dives (operation log, streams, checkpoints, sync, etc.)
    07-agent-api.md
    08-development-roadmap.md
    09-ai-context.md
    10-testing-strategy.md
    11-cli-reference.md
  loomhub.md            # LoomHub platform docs
```

## Related

- [Loom CLI](https://github.com/LoomHubDev/loom) — The versioning system
- [LoomHub](https://github.com/LoomHubDev/loomhub) — Hosting platform for Loom projects
