# Contributing to pixe-spirit

Thank you for your interest in contributing!

## Development Setup

```bash
git clone https://github.com/takikou347/pixe-spirit.git
cd pixe-spirit
pnpm install
```

## Scripts

```bash
pnpm dev          # Watch mode
pnpm build        # Build for production
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm type-check   # TypeScript check
pnpm lint         # ESLint
pnpm format       # Prettier format
```

## Guidelines

- Write tests for new features
- Run `pnpm type-check && pnpm lint && pnpm test` before submitting a PR
- Keep the library framework-agnostic (no DOM/Canvas/React dependencies)
- Maintain determinism: same inputs must always produce same outputs
