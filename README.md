# advisor.ai Web

Web front-end of the advisor.ai project, an article search and recommendation platform focused on promoting collaboration between researchers using AI.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

## Development

### Requirements

The web version of the advisor.ai platform is built with [Next.js](https://nextjs.org/docs). Also, it uses [pNpm](https://pnpm.io/) as dependency manager.

In order to run it locally, make shure you have installed

- Node.js `21.7.3`
- pNpm `2.12.3`

### Installation

To install the web dependencies, run

```bash
pnpm install
```

### Run locally

To run the development server, execute

```bash npm run dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Tests and coverage

This project is being tested with [Vitest](https://vitest.dev/).

To run the unit and integration tests, execute

```bash
pnpm run test:unit
```

To see the current test coverage, run

```bash
pnpm run coverage
```

### Code quality

This project uses [Biome](https://biomejs.dev/) as code formatter and linter.

In order to validate the code and correct the auto fixable issues, run

```bash
pnpm run check
```
