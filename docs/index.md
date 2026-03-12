---
layout: home

hero:
  name: Loom
  text: Versioning, Sync, and Timeline in One System
  tagline: Loom is a Git replacement built for continuous multi-space history. Track code, docs, design, data, configs, notes, and AI work in one local-first timeline.
  image:
    src: /loom-mark.svg
    alt: Loom mark
  actions:
    - theme: brand
      text: Read The Vision
      link: /loom/01-vision
    - theme: alt
      text: See The CLI
      link: /loom/11-cli-reference
    - theme: alt
      text: Setup Guide
      link: /loom/03-project-setup

features:
  - title: Versioning System
    details: Replace commit ceremony with append-only operations, streams, checkpoints, semantic diffs, and restore workflows.
  - title: Sync Engine
    details: Send and receive through hubs with negotiate-based sync, object transfer, and a path toward team collaboration.
  - title: Timeline System
    details: Every meaningful change becomes part of a searchable, local-first timeline that humans and agents can navigate.
---
<div class="landing-band">
  <div>
    <span class="landing-eyebrow">Product Shape</span>
    <h2>Three systems collapsed into one surface</h2>
    <p>
      Loom is not just source control. It is the versioning engine, the sync layer,
      and the timeline model for the whole project.
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
    <p>Loom versions code, docs, design, data, config, and notes in one shared model instead of forcing everything through a file-tree-only worldview.</p>
  </div>
  <div class="landing-card">
    <h3>Local-first by default</h3>
    <p>Your full history lives locally. Hubs extend Loom for send and receive, but the product still works offline and keeps the timeline on your machine.</p>
  </div>
  <div class="landing-card">
    <h3>Agent-native workflows</h3>
    <p>Loom exposes structured models for checkpoints, diffs, restore, and timeline queries so agents can work against a real versioning surface instead of shell hacks.</p>
  </div>
</div>

## First Flow

```bash
loom init
loom watch
loom checkpoint "before auth refactor"
loom log
loom diff
loom restore <checkpoint>
loom hub add origin https://loomhub.dev/flakerimi/my-app
loom send
loom receive
```

## Start Here

<div class="landing-grid landing-grid-docs">
  <a class="landing-card landing-link" href="/loom/01-vision">
    <h3>Vision</h3>
    <p>Read the product argument, core vocabulary, and the full Loom position.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/03-project-setup">
    <h3>Project Setup</h3>
    <p>Initialize Loom in a project, understand spaces, and see the local folder shape.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/11-cli-reference">
    <h3>CLI Reference</h3>
    <p>Use the command surface for checkpoints, streams, hubs, send, receive, and restore.</p>
  </a>
  <a class="landing-card landing-link" href="/loom/02-technical-architecture">
    <h3>Architecture</h3>
    <p>Understand the core engine, storage model, and sync boundaries before implementation.</p>
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
