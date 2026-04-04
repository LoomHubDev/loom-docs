import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Loom Docs",
  description: "Official documentation for Loom and its system architecture.",
  appearance: true,
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ["meta", { name: "theme-color", content: "#f4efe7" }],
    ["meta", { name: "color-scheme", content: "light dark" }]
  ],
  themeConfig: {
    logo: {
      light: "/loom-logo-light.svg",
      dark: "/loom-logo-dark.svg",
      alt: "Loom mark"
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Architecture", link: "/loom/02-technical-architecture" },
      { text: "CLI", link: "/loom/11-cli-reference" },
      { text: "Systems", link: "/loom/06-systems/operation-log" },
      { text: "AI", link: "/loom/07-agent-api" },
      { text: "Roadmap", link: "/loom/08-development-roadmap" },
      { text: "LoomHub", link: "/loomhub" }
    ],
    socialLinks: [],
    search: {
      provider: "local"
    },
    sidebar: {
      "/loom/": [
        {
          text: "Overview",
          items: [
            { text: "Docs Index", link: "/loom/index" },
            { text: "Vision", link: "/loom/01-vision" },
            { text: "Technical Architecture", link: "/loom/02-technical-architecture" },
            { text: "Project Setup", link: "/loom/03-project-setup" },
            { text: "CLI Reference", link: "/loom/11-cli-reference" }
          ]
        },
        {
          text: "Core Model",
          items: [
            { text: "Data Models", link: "/loom/04-data-models" },
            { text: "Storage Schema", link: "/loom/05-storage-schema" }
          ]
        },
        {
          text: "Systems",
          items: [
            { text: "Operation Log", link: "/loom/06-systems/operation-log" },
            { text: "Checkpoints", link: "/loom/06-systems/checkpoints" },
            { text: "Streams", link: "/loom/06-systems/streams" },
            { text: "Merge", link: "/loom/06-systems/merge" },
            { text: "Diff", link: "/loom/06-systems/diff" },
            { text: "Sync", link: "/loom/06-systems/sync" },
            { text: "Adapters", link: "/loom/06-systems/adapters" }
          ]
        },
        {
          text: "AI & Integration",
          items: [
            { text: "Agent API", link: "/loom/07-agent-api" },
            { text: "AI Context", link: "/loom/09-ai-context" }
          ]
        },
        {
          text: "Engineering",
          items: [
            { text: "Development Roadmap", link: "/loom/08-development-roadmap" },
            { text: "Testing Strategy", link: "/loom/10-testing-strategy" }
          ]
        }
      ]
    },
    footer: {
      message: "Loom docs for the versioning engine, sync layer, and timeline model.",
      copyright: "Loom documentation"
    }
  }
});
