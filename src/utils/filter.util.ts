import { Country } from "@/typings";

export const filterCountriesByCode = (countries: Country[], filterText: string): Country[] => {
  return countries.filter((country) =>
    country.code.toLowerCase().includes(filterText.toLowerCase())
  );
};