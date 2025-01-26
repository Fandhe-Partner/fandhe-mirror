# @fandhe/mirror-config-biome

Shared Biome configuration for Mirror UI packages.

## Installation

```bash
npm install --save-dev @fandhe/mirror-config-biome
```

## Usage

In your `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.5.3/schema.json",
  "extends": ["./node_modules/@fandhe/mirror-config-biome/biome.base.json"]
}
```

## Configuration

This package provides a base configuration for Biome that includes:

- Formatting rules
- Linting rules
- JavaScript/TypeScript specific settings
- Import organization

For more details, see the configuration in `biome.base.json`.

## License

MIT
