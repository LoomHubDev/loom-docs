# 08 — Development Roadmap

## Phase Overview

| Phase | Focus | Milestone |
|-------|-------|-----------|
| 1 | Foundation | Core engine works: init, write ops, checkpoint, log |
| 2 | File watching + Auto-versioning | Continuous versioning daemon |
| 3 | Diff + Restore | Compare and restore any point |
| 4 | Streams + Merge | Branching with intelligent merge |
| 5 | Agent API | LLM-native versioning interface |
| 6 | Sync (Client/Server) | Push/pull to remotes |
| 7 | Polish + Release | v0.1.0 public release |

## Phase 1: Foundation

Build the core engine. Everything else depends on this.

### Deliverables

- [x] Go module setup (`go.mod`, project structure, Makefile)
- [x] Core types (Operation, Checkpoint, Stream, Entity, Object)
- [x] SQLite storage layer (schema, migrations, pragmas)
- [x] Object store (SHA-256 content-addressed blobs)
- [x] Operation log (write, read, query)
- [x] Checkpoint engine (create manual checkpoints)
- [x] Stream manager (create `main`, basic CRUD)
- [x] Space adapter interface
- [x] Code adapter (Git-aware)
- [x] Docs adapter (filesystem)
- [x] CLI: `loom init`
- [x] CLI: `loom status`
- [x] CLI: `loom checkpoint <title>`
- [x] CLI: `loom log`
- [x] Tests: core, storage, adapters

### Exit Criteria

```bash
cd my-project
loom init            # Creates .loom/ with SQLite + config
loom status          # Shows detected spaces and entity count
loom checkpoint "v1" # Creates a checkpoint
loom log             # Shows the checkpoint
```

## Phase 2: File Watching + Auto-Versioning

The "Google Docs" experience: changes are versioned automatically.

### Deliverables

- [x] File watcher (fsnotify-based)
- [x] Change debouncer (500ms default)
- [x] Ignore system (.loomignore + built-in patterns)
- [x] Watch → adapter → operation pipeline
- [x] Auto-checkpoint engine (threshold + time-based)
- [x] CLI: `loom watch` (foreground daemon)
- [x] CLI: `loom watch --daemon` (background)
- [x] Config: `[watch]` and `[checkpoint]` sections
- [x] Design adapter (JSON structural tracking)
- [x] Notes adapter (text tracking)
- [x] Tests: watcher, debouncer, auto-checkpoint

### Exit Criteria

```bash
loom watch &                 # Start daemon
echo "hello" > docs/new.md   # File created
# Loom auto-creates operation
# After threshold, auto-checkpoint created

loom log                     # Shows auto-checkpoints
```

## Phase 3: Diff + Restore

See what changed. Go back in time.

### Deliverables

- [x] Diff engine (orchestration layer)
- [x] Text diff (Myers algorithm)
- [x] Structured diff (JSON patch)
- [x] Binary diff (fingerprint comparison)
- [x] Diff formatting (terminal with color, JSON, patch)
- [x] Ref resolution (checkpoint IDs, HEAD, HEAD~N)
- [x] Restore engine (full, per-space, per-entity)
- [x] Guard checkpoint (auto-created before restore)
- [x] Restore checkpoint (auto-created after restore)
- [x] CLI: `loom diff`
- [x] CLI: `loom diff <from> <to>`
- [x] CLI: `loom show <checkpoint-id>`
- [x] CLI: `loom restore <checkpoint-id>`
- [x] Tests: diff, restore, round-trip

### Exit Criteria

```bash
loom diff                    # Shows changes since last checkpoint
loom diff HEAD~2 HEAD        # Compare two checkpoints
loom restore <id>            # Restore project state
loom log                     # Shows guard + restore checkpoints
```

## Phase 4: Streams + Merge

Branching without the pain.

### Deliverables

- [x] Stream creation (fork from current)
- [x] Stream switching
- [x] Stream listing and info
- [x] Fork point detection
- [x] Three-way text merge
- [x] Structural merge (JSON)
- [x] Merge engine (Tier 1 + Tier 2 auto-merge)
- [x] LLM merge integration (Tier 3)
- [x] Merge policy configuration
- [x] CLI: `loom stream create/switch/list/info`
- [x] CLI: `loom weave <stream>` (merge command)
- [x] Tests: merge scenarios, conflict resolution

### Exit Criteria

```bash
loom stream create feature/auth    # Fork a stream
# ... make changes ...
loom stream switch main            # Switch back
loom weave feature/auth            # Weave (merge) without conflicts
```

## Phase 5: Agent API

Make Loom a first-class tool for AI agents.

### Deliverables

- [x] Go SDK (`pkg/loom/client.go`)
- [x] HTTP API server (agent-server)
- [x] All agent endpoints (checkpoint, rollback, diff, log, status, explain, search, record, tools)
- [x] LLM tool definitions (JSON schema for function calling)
- [x] Agent authentication (local tokens)
- [x] SSE event stream (for real-time agent notifications)
- [x] CLI: `loom agent-server`
- [x] Tests: SDK, API endpoints

### Exit Criteria

```bash
loom agent-server --port 7890 &

# From an agent:
curl -X POST localhost:7890/api/v1/checkpoint \
  -d '{"title": "before refactor"}'
# Returns checkpoint JSON

curl localhost:7890/api/v1/status
# Returns project status JSON
```

## Phase 6: Sync (Client/Server)

Push and pull to remotes.

### Deliverables

- [x] Loom server binary (`cmd/loom-server`)
- [x] Server API (negotiate, push, pull, project info)
- [x] Server storage (SQLite, optionally Postgres)
- [x] Server authentication (JWT tokens)
- [x] Sync client (push, pull, negotiate)
- [x] Hub management (add, remove, list, auth, status)
- [x] Sync log (track what's been synced)
- [x] CLI: `loom hub add/remove/list/auth/status`
- [x] CLI: `loom send`
- [x] CLI: `loom receive`
- [x] Docker image for server
- [x] Tests: sync round-trip, server API

### Exit Criteria

```bash
# Start server
docker run -p 8080:8080 loom-server

# Client
loom hub add origin http://localhost:8080/project/my-app
loom send                    # Sends ops + objects
loom receive                 # Receives remote ops
```

## Phase 7: Polish + Release

Prepare for v0.1.0 public release.

### Deliverables

- [x] Error messages and UX polish
- [x] `loom doctor` (integrity checks)
- [x] `loom export` / `loom import` (backup/restore)
- [x] `loom compact` (operation log compaction)
- [x] `.loomignore` documentation
- [x] GoReleaser config (cross-platform builds)
- [x] CI/CD pipeline (GitHub Actions)
- [x] README.md
- [x] Website / landing page
- [x] Homebrew formula
- [x] Performance benchmarks (15 benchmarks)
- [x] Space CLI (`loom space list/add/remove`)
- [x] Vault locking (flock-based)
- [x] Hooks system (8 events: pre/post checkpoint, restore, push, pull)
- [x] Merge config from config.toml
- [x] Hub status command
- [x] SSE event stream for agent API
- [x] 3 external SDKs (Python, TypeScript, Rust)
- [x] Security audit
- [x] License headers

### Exit Criteria

```bash
# Install via Homebrew
brew install loom

# Full workflow
loom init
loom watch &
# ... work ...
loom checkpoint "ready for review"
loom send
loom diff HEAD~5 HEAD
loom agent-server &
```

## Implementation Status

All phases 1-7 are implemented and tested as of April 2026.

| Phase | Status | Tests | Packages |
|-------|--------|-------|----------|
| 1 Foundation | Complete | 271+ | core, storage, sync, cli |
| 2 File Watch | Complete | 27 | internal/watch |
| 3 Diff + Restore | Complete | 41 | internal/diff |
| 4 Streams + Merge | Complete | 27 | internal/merge |
| 5 Agent API | Complete | 16 | pkg/loom, internal/agent |
| 6 Sync Server | Complete | 6 | internal/server |
| 7 Polish | Complete | 111+ | cli (doctor/export/import/compact), adapters, hooks, locking |

**Total: 499 passing tests across 12 packages + 15 benchmarks. Full suite runs in ~30s.**

## Future (Post v0.1.0)

| Feature | Phase |
|---------|-------|
| CRDT-based merge (Automerge integration) | v0.2 |
| Real-time collaboration (WebSocket sync) | v0.2 |
| Construct space integration (visual UI) | v0.2 |
| Semantic diff (AST-aware code diff) | v0.3 |
| Operation log compaction (background) | v0.3 |
| Plugin system (custom adapters as Go plugins) | v0.3 |
| Git bridge (import/export Git history) | v0.4 |
| Cloud hosting (managed Loom server) | v0.5 |
| Multi-project versioning | v0.5 |
| Encryption at rest | v0.5 |
| Signed operations (cryptographic signatures) | v0.6 |

## Timeline

Phase 1-3 are the critical path. Once diffing and restore work, Loom is usable as a personal tool. Phases 4-6 enable team collaboration. Phase 7 makes it releasable.

No time estimates — focus on shipping each phase completely before moving to the next.
