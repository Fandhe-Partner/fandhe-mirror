import { describe, expect, it } from 'vitest';
import { UIFrontendGenerator } from '../src/generators';

describe('UIFrontendGenerator', () => {
  it('should be instantiable with config', () => {
    const generator = new UIFrontendGenerator({ components: [] });
    expect(generator).toBeInstanceOf(UIFrontendGenerator);
  });

  it('should have generate method', () => {
    const generator = new UIFrontendGenerator({ components: [] });
    expect(generator.generate).toBeInstanceOf(Function);
  });
});
