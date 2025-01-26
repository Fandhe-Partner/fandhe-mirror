# @fandhe/mirror-config-tsconfig

Shared TypeScript configuration for Mirror UI packages.

## Installation

```bash
npm install --save-dev @fandhe/mirror-config-tsconfig
```

## Usage

In your `tsconfig.json`:

```json
{
  "extends": "@fandhe/mirror-config-tsconfig/tsconfig.base.json"
}
```

## Configuration

This package provides a base TypeScript configuration that includes:

- ES2020 target
- ESM module system
- Strict type checking
- Source map generation
- Declaration file generation

For more details, see the configuration in `tsconfig.base.json`.

## License

MIT
