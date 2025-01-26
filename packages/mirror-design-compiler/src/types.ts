export type DesignTool = 'figma' | 'framer' | 'uxpin';

export interface DesignToolConfig {
  tool: DesignTool;
  apiKey?: string;
  projectId?: string;
}

export interface CompilerOptions {
  tool: DesignToolConfig;
  outputFormat?: 'json' | 'yaml';
}
