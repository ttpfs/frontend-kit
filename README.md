# frontend-kit

A monorepo containing React UI component libraries, published to the GitHub Package Registry.

## Packages

<!-- PACKAGES_TABLE_START -->

| Package | Version | Description |
|---|---|---|
| [`@ttpfs/form-react`](./packages/form) | `0.3.5` | Type-safe React form library built with react-hook-form, Zod, and HeroUI. |
| [`@ttpfs/table-react`](./packages/table) | `0.2.4` | Flexible React table built on TanStack Table with a polished HeroUI layer. |
| [`@ttpfs/ui-react`](./packages/ui) | `1.4.5` | React UI component library built on HeroUI (using Tailwind CSS v4) with simplified APIs and theming support. |

<!-- PACKAGES_TABLE_END -->

## Requirements

- Node.js `>=20`
- pnpm `9.0.0`

## Installation

```bash
pnpm install
pnpm build	         // Build all packages
pnpm storybook	     // Run Storybook
pnpm lint	           // Check linting with Biome
pnpm format:fix	     // Automatically format code
pnpm release	       // Build and publish all packages
pnpm sync:readme	   // Sync package versions and content in README
```

All packages are published to the GitHub Package Registry (https://npm.pkg.github.com).

Add the following to your .npmrc:

```bash
@ttpfs:registry=https://npm.pkg.github.com
```