import { describe, expect, it } from 'vitest';
import { DesignCompiler } from '../src/compilers';

describe('DesignCompiler', () => {
  it('should be instantiable with options', () => {
    const compiler = new DesignCompiler({ tool: { tool: 'figma' } });
    expect(compiler).toBeInstanceOf(DesignCompiler);
  });

  it('should have compile method', () => {
    const compiler = new DesignCompiler({ tool: { tool: 'figma' } });
    expect(compiler.compile).toBeInstanceOf(Function);
  });

  it('should throw error for unsupported design tool', async () => {
    const compiler = new DesignCompiler({
      tool: { tool: 'unsupported' as 'figma' | 'framer' | 'uxpin' },
    });
    await expect(compiler.compile()).rejects.toThrow('Unsupported design tool');
  });
});
