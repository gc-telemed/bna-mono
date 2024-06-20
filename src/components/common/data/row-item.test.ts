import { describe, it, expect } from 'vitest';
import { spacedToCamelCase } from './row-item';

describe('RowItem', () => {
  it('should camelCase it', () => {
    const originalStr = "hello world";
    expect(spacedToCamelCase(originalStr)).toBe("helloWorld");
  });
})
