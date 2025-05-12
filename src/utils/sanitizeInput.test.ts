import { sanitizeInput } from './sanitizeInput';

describe('sanitizeInput', () => {
  it('should remove special characters and numbers', () => {
    expect(sanitizeInput('US123!@#')).toBe('US');
    expect(sanitizeInput('a$%b^&c*')).toBe('abc');
    expect(sanitizeInput('A1B2C3')).toBe('ABC');
  });

  it('should keep only alphabetic characters', () => {
    expect(sanitizeInput('DE')).toBe('DE');
    expect(sanitizeInput('de')).toBe('de');
  });

  it('should return an empty string if input is only special characters', () => {
    expect(sanitizeInput('!@#$%^&*')).toBe('');
  });

  it('should handle empty strings', () => {
    expect(sanitizeInput('')).toBe('');
  });

  it('should work with mixed casing', () => {
    expect(sanitizeInput('uS')).toBe('uS');
  });
});
