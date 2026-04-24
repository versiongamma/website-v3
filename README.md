# VersionGamma.com
A personal website build in React 19 using the TanStack Start framework.

[![Checks](https://github.com/versiongamma/website-v3/actions/workflows/checks.yml/badge.svg)](https://github.com/versiongamma/website-v3/actions/workflows/checks.yml)

## Getting Started
This project uses Bun for package management. See [their repository](https://github.com/oven-sh/bun) for installation instructions

### Setup project:
```bash
bun install
cp .env.sample .env
```

### Running Locally
Run dev server:
```bash
bun dev
```

Build production output:
```bash
bun run build
```
>_Must be bun **run** to override bun's builder_

Preview build:
```bash
bun preview
```

### Testing
This project uses vitest for unit tests. To run unit tests:
```bash
bun run test 
```
>_Must be bun **run** to override bun's test runner_

### Linting / Formatting
This project uses Biome for linting and formatting. To run biome:
```bash
bun format
bun lint
```

## Built With:
[![](https://skills.syvixor.com/api/icons?i=ts,react,tanstack,reacthookform,tailwind,vite,vitest,nitro,bun,biome,docker)]()
