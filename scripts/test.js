#!/usr/bin/env node

const { spawnSync } = require("child_process");

// Common test configuration
const testConfig = {
	coverage: process.env.CI ? true : false,
	watch: process.env.CI ? false : true,
};

// Run vitest with common configuration
const result = spawnSync(
	"vitest",
	[
		"run",
		testConfig.coverage ? "--coverage" : "",
		testConfig.watch ? "--watch" : "",
	],
	{
		stdio: "inherit",
		shell: true,
		cwd: process.cwd(),
	},
);

process.exit(result.status);
