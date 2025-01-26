export type TSConfig = {
	compilerOptions: {
		target: string;
		module: string;
		lib?: string[];
		declaration?: boolean;
		declarationMap?: boolean;
		sourceMap?: boolean;
		outDir?: string;
		rootDir?: string;
		strict?: boolean;
		moduleResolution?: string;
		esModuleInterop?: boolean;
		skipLibCheck?: boolean;
		forceConsistentCasingInFileNames?: boolean;
	};
	include?: string[];
	exclude?: string[];
};

export const baseConfig = {
	compilerOptions: {
		target: "ES2020",
		module: "ESNext",
		lib: ["ES2020", "DOM", "DOM.Iterable"],
		declaration: true,
		declarationMap: true,
		sourceMap: true,
		outDir: "./dist",
		rootDir: "./src",
		strict: true,
		moduleResolution: "node",
		esModuleInterop: true,
		skipLibCheck: true,
		forceConsistentCasingInFileNames: true,
	},
	include: ["src"],
	exclude: ["node_modules", "dist"],
};

export default baseConfig;
