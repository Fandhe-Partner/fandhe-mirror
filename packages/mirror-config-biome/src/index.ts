export type BiomeConfig = {
	$schema: string;
	organizeImports: { enabled: boolean };
	linter: {
		enabled: boolean;
		rules: {
			recommended: boolean;
			correctness: Record<string, string>;
			suspicious: Record<string, string>;
			style: Record<string, string>;
		};
	};
	formatter: {
		enabled: boolean;
		indentStyle: string;
		indentWidth: number;
		lineWidth: number;
	};
	javascript: {
		formatter: {
			quoteStyle: string;
			trailingComma: string;
		};
	};
};

export const baseConfig = {
	$schema: "https://biomejs.dev/schemas/1.5.3/schema.json",
	organizeImports: {
		enabled: true,
	},
	linter: {
		enabled: true,
		rules: {
			recommended: true,
			correctness: {
				noUnusedVariables: "error",
			},
			suspicious: {
				noExplicitAny: "error",
			},
			style: {
				useConst: "error",
				useTemplate: "error",
			},
		},
	},
	formatter: {
		enabled: true,
		indentStyle: "space",
		indentWidth: 2,
		lineWidth: 100,
	},
	javascript: {
		formatter: {
			quoteStyle: "single",
			trailingComma: "es5",
		},
	},
};

export default baseConfig;
