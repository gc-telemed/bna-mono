import { describe, it, expect } from 'bun:test';
import { spacedToCamelCase } from './row-item';

describe('RowItem', () => {
  it('should camelCase it', () => {
    const originalStr = "hello world";
    expect(spacedToCamelCase(originalStr)).toBe("helloWorld");
  });
})
