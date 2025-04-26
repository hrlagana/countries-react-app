import { Country } from "@/typings";
import { filterCountriesByCode } from "./filter.util";

const mockCountries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'GB', name: 'United Kingdom' },
];

describe('filterCountriesByCode', () => {
  it('should return all countries if filterText is empty', () => {
    const result = filterCountriesByCode(mockCountries, '');
    expect(result).toEqual(mockCountries);
  });

  it('should filter countries by code (case insensitive)', () => {
    const result = filterCountriesByCode(mockCountries, 'us');
    expect(result).toEqual([{ code: 'US', name: 'United States' }]);
  });

  it('should return multiple matches if applicable', () => {
    const result = filterCountriesByCode(mockCountries, 'A');
    expect(result).toEqual([
      { code: 'CA', name: 'Canada' },
      { code: 'AU', name: 'Australia' },
    ]);
  });

  it('should return an empty array if no country code matches', () => {
    const result = filterCountriesByCode(mockCountries as any, 'ZZ');
    expect(result).toEqual([]);
  });

  it('should match partial codes', () => {
    const result = filterCountriesByCode(mockCountries as any, 'G');
    expect(result).toEqual([{ code: 'GB', name: 'United Kingdom' }]);
  });
});