import { describe, it, expect } from 'vitest';
import { DesignGenerator } from '../src/generators';

describe('DesignGenerator', () => {
  it('should be instantiable with config', () => {
    const generator = new DesignGenerator({ tool: 'figma' });
    expect(generator).toBeInstanceOf(DesignGenerator);
  });

  it('should have generate method', () => {
    const generator = new DesignGenerator({ tool: 'figma' });
    expect(generator.generate).toBeInstanceOf(Function);
  });
});
