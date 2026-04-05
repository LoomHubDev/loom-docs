# 11 — CLI Reference

## Overview

Loom's CLI is built with Cobra. All commands follow this pattern:

```bash
loom <command> [subcommand] [flags] [args]
```

## Global Flags

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--project` | `-p` | `.` | Project directory path |
| `--version` | | | Print version and exit |

## Commands

### `loom init`

Initialize a new Loom project.

```bash
loom init [path]
```

**What it does:**
1. Creates `.loom/` directory with SQLite database and config
2. Auto-detects spaces (code, docs, design, data, config, notes)
3. Creates `main` stream
4. Performs initial entity scan

**Output:**
```
Initialized Loom in /Users/flakerimi/my-project
Detected spaces:
  ✓ code     142 entities
  ✓ docs      28 entities (docs/)
  ✓ design    15 entities (design/)
Stream: main
```

---

### `loom status`

Show current project status.

```bash
loom status
```

**Output:**
```
Project: my-app
Stream:  main (seq 1234)
Last checkpoint: "auth refactor" (2 hours ago)

Spaces:
  code     142 entities   3 changed since checkpoint
  docs      28 entities   0 changed
  design    15 entities   1 changed

4 operations since last checkpoint
```

**Flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--space` | all | Show status for a specific space |

---

### `loom checkpoint`

Create a named checkpoint.

```bash
loom checkpoint <title>
```

**Examples:**
```bash
loom checkpoint "auth system complete"
loom checkpoint "before redesign"
loom checkpoint "pre-deploy"
```

**Output:**
```
Checkpoint created: 01ARZ3NDEK
  Title: auth system complete
  Seq:   1234
  Spaces: code (5 modified), docs (2 modified)
```

---

### `loom log`

Show checkpoint history.

```bash
loom log [flags]
```

**Output:**
```
01ARZ3NDEK  auth system complete          manual   2 min ago
  code: 5 modified | docs: 2 modified

01ARZ3NDED  Auto checkpoint at 14:30      auto     35 min ago
  code: 12 modified

01ARZ3NDEA  initial setup                 manual   2 hours ago
  code: 142 created | docs: 28 created | design: 15 created
```

**Flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--space` | all | Filter by space |
| `--source` | all | Filter by source (manual, auto, agent) |
| `--since` | none | Show checkpoints after date |
| `--until` | none | Show checkpoints before date |
| `--search` | none | Full-text search in titles/summaries |
| `--limit` `-n` | 20 | Max checkpoints to show |
| `--format` | `text` | Output format: text, json |

---

### `loom show`

Show details of a specific checkpoint.

```bash
loom show <checkpoint-id>
```

**Output:**
```
Checkpoint: 01ARZ3NDEK
Title:      auth system complete
Author:     flakerimi
Source:      manual
Stream:     main
Seq:        1234
Created:    2026-03-11T10:15:30.000Z

Spaces:
  code (changed)
    5 entities modified, +42 -13 lines
    Entities:
      ✎ src/auth/login.go
      ✎ src/auth/middleware.go
      ✎ src/auth/config.go
      ✎ src/auth/auth_test.go
      ✎ src/routes/api.go

  docs (changed)
    2 entities modified
    Entities:
      ✎ docs/auth.md
      ✎ docs/api-reference.md
```

---

### `loom diff`

Show changes between two points.

```bash
loom diff [from] [to] [flags]
```

**Examples:**
```bash
loom diff                        # Last checkpoint to now
loom diff HEAD~1                 # One checkpoint back to now
loom diff HEAD~3 HEAD~1          # Between two checkpoints
loom diff <id-a> <id-b>         # Between specific checkpoints
loom diff --space code           # Only code changes
loom diff --entity src/main.go  # Only one file
```

**Flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--space` | all | Filter by space |
| `--entity` | all | Filter by entity path |
| `--summary` | `false` | Summary only, no content |
| `--context` `-C` | 3 | Lines of context |
| `--format` | `text` | Output format: text, json |

---

### `loom restore`

Restore to a previous checkpoint.

```bash
loom restore <checkpoint-id> [flags]
```

**Flow:**
1. Creates guard checkpoint (saves current state)
2. Restores content to target checkpoint state
3. Creates restore checkpoint (records the restore)

**Flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--space` | all | Restore only one space |
| `--entity` | all | Restore only one entity |

**Output:**
```
Creating guard checkpoint... done
Restoring to "auth system complete" (01ARZ3NDEK)

  code:
    ✓ src/auth/login.go restored
    ✓ src/auth/middleware.go restored
    ✓ src/auth/config.go restored

  docs:
    ✓ docs/auth.md restored

Restore complete. Guard checkpoint: 01ARZ3NDEM
```

---

### `loom stream`

Manage streams.

```bash
loom stream <subcommand> [flags]
```

**Subcommands:**

```bash
loom stream create <name>        # Create new stream (fork from current)
loom stream switch <name>        # Switch active stream
loom stream list                 # List all streams
loom stream info <name>          # Show stream details
```

**Output (list):**
```
  main            seq 1234  active     2 min ago
* feature/auth    seq 1250  active     just now
  fix/login       seq 1200  woven      1 day ago
```

---

### `loom weave`

Weave a stream into the current stream.

```bash
loom weave <stream-name> [flags]
```

**Flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--dry-run` | `false` | Show what would be woven |
| `--strategy` | `auto` | Weave strategy: auto, ours, theirs |

**Output:**
```
Weaving feature/auth into main...

  ✓ 15 entities auto-woven (Tier 1: different entities)
  ✓ 3 entities auto-woven (Tier 2: non-overlapping changes)

Weave complete. 18 operations applied.
Checkpoint: "Weave feature/auth into main"
```

---

### `loom watch`

Start the auto-versioning daemon.

```bash
loom watch [flags]
```

**Flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--debounce` | `500ms` | Debounce duration for file events |
| `--no-auto-checkpoint` | `false` | Disable automatic checkpointing |

**Output (foreground):**
```
Watching my-app...
  Spaces: code, docs, design
  Auto-checkpoint: every 50 ops or 5 min

[14:30:01] code  src/auth/login.go modified
[14:30:01] code  src/auth/config.go modified
[14:30:15] docs  docs/auth.md modified
[14:35:01] ◆ Auto checkpoint: "3 files in code, 1 in docs" (seq 1250)
```

---

### `loom hub`

Manage hubs (remote servers).

```bash
loom hub <subcommand> [flags]
```

**Subcommands:**
```bash
loom hub add <name> <url>        # Add a hub
loom hub remove <name>           # Remove a hub
loom hub list                    # List hubs
loom hub auth <name>             # Set authentication
```

---

### `loom send`

Send operations to a hub.

```bash
loom send [hub] [flags]
```

**Flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--all` | `false` | Send all streams |
| `--stream` | current | Specific stream to send |

---

### `loom receive`

Receive operations from a hub.

```bash
loom receive [hub] [flags]
```

**Flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--all` | `false` | Receive all streams |
| `--stream` | current | Specific stream to receive |

---

### `loom doctor`

Check project integrity.

```bash
loom doctor
```

**Output:**
```
Checking Loom project...
  ✓ Database integrity
  ✓ Object store (234 objects, 12.4 MB)
  ✓ All references valid
  ✓ Sequence numbers monotonic
  ✓ Stream heads valid

All checks passed.
```

---

### `loom compact`

Compact the operation log by removing superseded operations and running VACUUM.

```bash
loom compact
```

---

### `loom export`

Export project history to a tar.gz archive.

```bash
loom export [output-path]
```

**Examples:**
```bash
loom export                      # Exports to default filename
loom export backup.tar.gz        # Exports to specific path
```

---

### `loom import`

Import project history from an archive.

```bash
loom import <archive-path>
```

**Examples:**
```bash
loom import backup.tar.gz
```

---

### `loom agent-server`

Start the agent API server standalone.

```bash
loom agent-server [flags]
```

**Flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--port` | 7890 | Port to listen on |

**Endpoints:**
```
POST /api/v1/checkpoint      # Create a checkpoint
POST /api/v1/rollback        # Rollback to a checkpoint
GET  /api/v1/diff            # Get diff
GET  /api/v1/log             # Get checkpoint log
GET  /api/v1/status          # Get project status
GET  /api/v1/search          # Search checkpoints
```

---

## `loom-server`

The hub server binary. Run as a standalone service to host shared project history.

```bash
loom-server serve [flags]
loom-server user add <username>
```

**Serve flags:**
| Flag | Default | Description |
|------|---------|-------------|
| `--port` | 8080 | Port to listen on |
| `--data` | `./data` | Directory for per-project SQLite databases |

**Authentication:** Uses bcrypt password hashing and hand-rolled HS256 JWT tokens.

**Examples:**
```bash
# Start the hub server
loom-server serve --port 8080 --data /var/lib/loom

# Add a user
loom-server user add alice

# Connect from a client
loom hub add origin http://localhost:8080/project/my-app
loom hub auth origin
loom send
loom receive
```

## Shell Completion

```bash
# Bash
loom completion bash > /etc/bash_completion.d/loom

# Zsh
loom completion zsh > "${fpath[1]}/_loom"

# Fish
loom completion fish > ~/.config/fish/completions/loom.fish
```
