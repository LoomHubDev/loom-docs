import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const sourceDir = path.resolve(repoRoot, "../loom/docs");
const targetDir = path.resolve(repoRoot, "docs/loom");
const loomIndex = `# Loom Documentation

This section is synced from the Loom source repository and organized as the canonical reference set for the product, architecture, systems, and CLI.

## Overview

- [Vision](./01-vision.md)
- [Technical Architecture](./02-technical-architecture.md)
- [Project Setup](./03-project-setup.md)
- [CLI Reference](./11-cli-reference.md)

## Core Model

- [Data Models](./04-data-models.md)
- [Storage Schema](./05-storage-schema.md)

## Systems

- [Operation Log](./06-systems/operation-log.md)
- [Checkpoints](./06-systems/checkpoints.md)
- [Streams](./06-systems/streams.md)
- [Merge](./06-systems/merge.md)
- [Diff](./06-systems/diff.md)
- [Sync](./06-systems/sync.md)
- [Adapters](./06-systems/adapters.md)

## Integration

- [Agent API](./07-agent-api.md)
- [AI Context](./09-ai-context.md)

## Engineering

- [Development Roadmap](./08-development-roadmap.md)
- [Testing Strategy](./10-testing-strategy.md)
`;

async function main() {
  await rm(targetDir, { recursive: true, force: true });
  await mkdir(targetDir, { recursive: true });
  await cp(sourceDir, targetDir, { recursive: true });

  const syncDocPath = path.join(targetDir, "06-systems", "sync.md");
  const syncDoc = await readFile(syncDocPath, "utf8");
  const patchedSyncDoc = syncDoc.replace(
    /\.\.\/\.\.\/loomhub\/docs\/01-vision\.md/g,
    "/loomhub"
  );
  await writeFile(syncDocPath, patchedSyncDoc, "utf8");
  await writeFile(path.join(targetDir, "index.md"), loomIndex, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
