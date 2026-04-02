# frontend-kit

Monorepo chứa các thư viện UI component cho React, được publish lên GitHub Package Registry.

## Packages

| Package | Version | Mô tả |
|---|---|---|
| [`@ttpfs/ui-react`](./packages/ui) | `1.1.6` | Thư viện UI component cơ bản (HeroUI + Tailwind CSS v4) |
| [`@ttpfs/form-react`](./packages/form) | `0.1.7` | Form fields tích hợp react-hook-form và Zod |
| [`@ttpfs/table-react`](./packages/table) | `0.1.4` | Data table xây dựng trên TanStack Table v8 |

## Yêu cầu

- Node.js `>=18`
- pnpm `9.0.0`

## Cài đặt

```bash
pnpm install
```

## Scripts

| Script | Mô tả |
|---|---|
| `pnpm build` | Build tất cả packages |
| `pnpm storybook` | Chạy Storybook |
| `pnpm lint` | Kiểm tra linting với Biome |
| `pnpm format:fix` | Format code tự động |
| `pnpm release` | Build và publish tất cả packages |

## Registry

Tất cả packages được publish lên GitHub Package Registry (`https://npm.pkg.github.com`).

Thêm vào `.npmrc` của project:

```
@ttpfs:registry=https://npm.pkg.github.com
```
