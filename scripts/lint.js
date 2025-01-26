#!/usr/bin/env node

const { spawnSync } = require("child_process");
const path = require("path");

// Common lint configuration
const lintConfig = {
	fix: process.env.CI ? false : true,
};

// Run biome with common configuration
const result = spawnSync(
	"npx",
	[
		"@biomejs/biome",
		"check",
		".",
		lintConfig.fix ? "--write" : "",
	].filter(Boolean),
	{
		stdio: "inherit",
		shell: true,
		cwd: process.cwd(),
	},
);

process.exit(result.status);
