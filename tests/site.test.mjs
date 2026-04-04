import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

async function read(relativePath) {
  return readFile(path.join(repoRoot, relativePath), "utf8");
}

test("theme config defines light and dark logo assets with non-default footer copy", async () => {
  const config = await read("docs/.vitepress/config.ts");

  assert.match(config, /light:\s*"\/loom-logo-light\.svg"/);
  assert.match(config, /dark:\s*"\/loom-logo-dark\.svg"/);
  assert.doesNotMatch(config, /Built with VitePress\./);
});

test("home page advertises the mode-aware docs shell", async () => {
  const home = await read("docs/index.md");

  assert.match(home, /landing-shell/);
  assert.match(home, /Mode-aware docs shell/);
});

test("brand assets exist for both themes", async () => {
  await access(path.join(repoRoot, "docs/public/loom-logo-light.svg"));
  await access(path.join(repoRoot, "docs/public/loom-logo-dark.svg"));
});
