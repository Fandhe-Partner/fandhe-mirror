import { describe, it, expect } from 'vitest';
import { version } from '../index';

describe('mirror-ui', () => {
  it('should export version', () => {
    expect(version).toBe('0.0.1');
  });
});
