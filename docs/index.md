---
layout: home

hero:
  name: Loom
  text: Operational History for the Whole Project
  tagline: Loom replaces commit ceremony with an append-only operation log, live streams, named checkpoints, and hub sync for code, docs, design, data, configs, and AI-adjacent work.
  image:
    src: /loom-mark.svg
    alt: Loom mark
  actions:
    - theme: brand
      text: Read the vision
      link: /loom/01-vision
    - theme: alt
      text: Browse architecture
      link: /loom/02-technical-architecture
    - theme: alt
      text: See the CLI
      link: /loom/11-cli-reference

features:
  - title: Operations over commits
    details: Record project change as an append-only stream of operations instead of batching meaning into manual commit points.
  - title: Streams and checkpoints
    details: Work in live timelines, then pin named checkpoints when a point in the history deserves a handle.
  - title: Send and receive
    details: Sync Loom state through hubs with negotiate, object transfer, and room for collaboration on top.
---
<div class="landing-shell">
  <div class="landing-shell-copy">
    <span class="landing-eyebrow">Docs Surface</span>
    <h2>Mode-aware docs shell</h2>
    <p>
      Light mode keeps architecture diagrams, schema pages, and CLI references crisp.
      Dark mode drops the chrome back for longer reading sessions without flattening the
      Loom palette.
    </p>
    <div class="landing-pill-row">
      <span>Readable diagrams</span>
      <span>Terminal-friendly contrast</span>
      <span>Clear architecture paths</span>
    </div>
  </div>
  <div class="landing-mode-grid">
    <div class="landing-mode-card mode-light">
      <strong>Light</strong>
      <span>Warm paper tones, sharper dividers, cleaner table scanning.</span>
    </div>
    <div class="landing-mode-card mode-dark">
      <strong>Dark</strong>
      <span>Lower-glare chrome, deeper surfaces, and stronger focus around content.</span>
    </div>
  </div>
</div>

<div class="landing-band">
  <div>
    <span class="landing-eyebrow">Product Shape</span>
    <h2>Three systems pulled into one model</h2>
    <p>
      Loom is the versioning engine, the sync layer, and the timeline model for a project
      that spans more than a source tree.
    </p>
  </div>
  <div class="landing-stats">
    <div>
      <strong>Operations</strong>
      <span>Atomic change history</span>
    </div>
    <div>
      <strong>Streams</strong>
      <span>Live working timelines</span>
    </div>
    <div>
      <strong>Checkpoints</strong>
      <span>Named points in time</span>
    </div>
  </div>
</div>

## Why Loom

<div class="landing-grid">
  <div class="landing-card">
    <h3>Beyond code-only history</h3>
    <p>Loom versions code, docs, design, data, config, and notes in one model instead of pushing every asset through a code-only mental frame.</p>
  </div>
  <div class="landing-card">
    <h3>Local-first by default</h3>
    <p>Your history lives on your machine first. Hubs extend Loom with send and receive, but the timeline remains local and browsable.</p>
  </div>
  <div class="landing-card">
    <h3>Agent-aware by design</h3>
    <p>Operations, checkpoints, streams, and sync state are explicit structures, which makes Loom easier to inspect, query, and automate.</p>
  </div>
</div>

## Read Loom by Layer

<div class="landing-grid">
  <a class="landing-card landing-link" href="/loom/02-technical-architecture">
    <h3>Engine</h3>
    <p>Start with the operation log, streams, checkpoints, storage layout, and where each layer stops.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/06-systems/sync">
    <h3>Sync</h3>
    <p>See negotiate, send, receive, object transfer, and how Loom talks to LoomHub without Git-era vocabulary.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/07-agent-api">
    <h3>Agent Surface</h3>
    <p>Read the structured interfaces and AI context instead of reverse-engineering behavior from CLI strings.</p>
  </a>
</div>

## First Flow

```bash
loom init
loom status
loom checkpoint "before auth refactor"
loom log
loom stream create feature/auth
loom hub add origin https://loomhub.dev/flakerimi/my-app
loom send
loom receive
```

## Start Here

<div class="landing-grid landing-grid-docs">
  <a class="landing-card landing-link" href="/loom/01-vision">
    <h3>Vision</h3>
    <p>Read the argument for operations, streams, checkpoints, and a multi-space history model.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/03-project-setup">
    <h3>Project Setup</h3>
    <p>Initialize a loom, inspect detected spaces, and understand the local vault shape.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/11-cli-reference">
    <h3>CLI Reference</h3>
    <p>Use the current command surface for checkpoints, streams, hubs, send, and receive.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/02-technical-architecture">
    <h3>Architecture</h3>
    <p>See the core engine, storage model, and sync boundaries before touching the implementation.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/04-data-models">
    <h3>Data Model</h3>
    <p>See operations, streams, checkpoints, entities, objects, remotes, and sync state.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/06-systems/sync">
    <h3>Sync System</h3>
    <p>Review negotiate, send, receive, transport types, and hub interaction patterns.</p>
  </a>
</div>

## System Map

- [Operation Log](/loom/06-systems/operation-log)
- [Checkpoints](/loom/06-systems/checkpoints)
- [Streams](/loom/06-systems/streams)
- [Merge / Weave Engine](/loom/06-systems/merge)
- [Diff](/loom/06-systems/diff)
- [Sync](/loom/06-systems/sync)
- [Adapters](/loom/06-systems/adapters)

## Engineering References

- [Storage Schema](/loom/05-storage-schema)
- [Agent API](/loom/07-agent-api)
- [AI Context](/loom/09-ai-context)
- [Development Roadmap](/loom/08-development-roadmap)
- [Testing Strategy](/loom/10-testing-strategy)
- [Loom Docs Index](/loom/index)
