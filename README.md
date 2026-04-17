# Frontend Kit – Internal UI System for Data-heavy Applications

A modular frontend system designed to solve common problems in large-scale frontend applications, including duplicated form logic, inconsistent UI patterns, and repetitive table implementations.

This project focuses on building a reusable abstraction layer to improve development consistency, scalability, and maintainability.

---

## Packages

<!-- PACKAGES_TABLE_START -->

| Package | Version | Description |
|---|---|---|
| [`@ttpfs/form-react`](./packages/form) | `0.3.9` | Type-safe React form library built with react-hook-form, Zod, and HeroUI. |
| [`@ttpfs/table-react`](./packages/table) | `0.2.5` | Flexible React table built on TanStack Table with a polished HeroUI layer. |
| [`@ttpfs/ui-react`](./packages/ui) | `2.0.0` | React UI component library built on HeroUI (using Tailwind CSS v4) with simplified APIs and theming support. |

<!-- PACKAGES_TABLE_END -->

---

## Problem

In real-world frontend applications, especially CRUD-heavy systems, several issues frequently occur:

* Form logic is duplicated across multiple features
* Validation and state handling become inconsistent
* Data tables are reimplemented with slight variations
* UI interaction patterns (modal, drawer, popover) lack standardization
* Difficult to scale and maintain across multiple screens

These problems lead to increased development time, higher bug rates, and poor maintainability.

---

## Solution

This toolkit introduces a structured abstraction layer to standardize common frontend patterns:

* **Form System**
  Built on React Hook Form + Zod, providing type-safe validation and reusable form components

* **Data Table Abstraction**
  Composed on top of TanStack Table, supporting sorting, pagination, and row selection

* **UI Interaction Layer**
  Standardized patterns for modal, drawer, and popover to ensure consistent behavior

* **Monorepo Architecture**
  Organized into multiple packages for better separation of concerns and reuse across projects

---

## Architecture

```
packages/
  ui/        → base UI components & interaction patterns
  form/      → form abstraction layer (RHF + Zod)
  table/     → data table system (TanStack Table)
apps/
  demo/      → example usage
```

The system is designed to separate core logic from application-specific implementation, enabling reuse and scalability.

---

## Design Principles

* **Composition over configuration**
* **Type safety first**
* **Reusability over duplication**
* **Explicit control over hidden logic**

---

## Trade-offs

* Increased abstraction introduces initial complexity
* Requires understanding of internal patterns before effective usage
* Less flexible than fully custom implementations in edge cases

---

## When to Use

* Data-heavy dashboards
* CRUD-heavy applications
* Projects requiring consistent UI patterns across multiple features

## When NOT to Use

* Small applications with simple UI
* Projects requiring highly customized UI per screen
* Situations where abstraction overhead is not justified

---

## Example Usage

### Form

```tsx
const form = useForm({
  schema: userSchema,
  options: {
    defaultValues: {...}
  }
});
```
---

## Real-world Usage

* Applied in personal portfolio and SPA projects
* Reduced duplicated implementation across features
* Improved development speed for CRUD workflows
* Standardized UI patterns and reduced inconsistency

---

## Future Improvements

* Improve documentation and developer onboarding
* Expand component coverage
* Add more advanced table features (server-side data handling, caching)
* Enhance customization flexibility

---

## Author

Tran Thanh Phong - Frontend Engineer (React / TypeScript)

## Setup & Requirements

### Requirements

- Node.js `>=20`
- pnpm `9.0.0`

### Installation

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

### Configuration

Add the following to your .npmrc:

```bash
@ttpfs:registry=https://npm.pkg.github.com
```