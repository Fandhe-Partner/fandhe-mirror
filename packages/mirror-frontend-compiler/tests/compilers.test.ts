import { describe, expect, it } from 'vitest';
import { FrontendCompiler } from '../src/compilers';

describe('FrontendCompiler', () => {
  it('should be instantiable with options', () => {
    const compiler = new FrontendCompiler({ framework: { framework: 'react' } });
    expect(compiler).toBeInstanceOf(FrontendCompiler);
  });

  it('should have compile method', () => {
    const compiler = new FrontendCompiler({ framework: { framework: 'react' } });
    expect(compiler.compile).toBeInstanceOf(Function);
  });

  it('should throw error for unsupported framework', async () => {
    const compiler = new FrontendCompiler({
      framework: { framework: 'unsupported' as 'react' | 'vue' | 'svelte' | 'lit' | 'solid' },
    });
    await expect(compiler.compile()).rejects.toThrow('Unsupported framework');
  });
});
