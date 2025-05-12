import { useEffect, useState } from 'react';
import { useQuery, useLazyQuery  } from '@apollo/client';
import { GET_COUNTRIES, GET_COUNTRY_BY_CODE } from '@/graphql/queries';
import { Card, CardContent } from '@/components/ui/card';
import { filterCountriesByCode } from '@/utils/filter.util';
import CountryFilter from './CountryFilter';
import CountryTable from './CountryTable';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { Country } from '@/typings';

const Countries = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [filterText, setFilterText] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState(filterText);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const [fetchCountry, { data: countryData, loading: countryLoading, error: countryError }] =
    useLazyQuery(GET_COUNTRY_BY_CODE);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filterText);
    }, 300);
    return () => clearTimeout(handler);
  }, [filterText]);

  // Trigger server-side lookup if exactly 2-letter code
  useEffect(() => {
    if (debouncedFilter.length === 2) {
      fetchCountry({ variables: { code: debouncedFilter.toUpperCase() } });
    } else {
      setFilteredCountries([]);
    }
  }, [debouncedFilter, fetchCountry]);

  // Handle country match from server
  useEffect(() => {
    if (countryData?.country) {
      setFilteredCountries([countryData.country]);
    } else if (debouncedFilter.length === 2 && countryData && !countryData.country) {
      setFilteredCountries([]);
    }
  }, [countryData, debouncedFilter]);


  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (countryError) return <ErrorState message={countryError.message} />;

  const countriesToDisplay =
    debouncedFilter.length === 2 ? filteredCountries : filterCountriesByCode(data.countries, debouncedFilter);
  
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4 min-h-screen">
      <Card>
        <CardContent className="p-4">
          <CountryFilter filter={filterText} onChange={setFilterText} />
        </CardContent>
      </Card>

      <Card className="opacity-90">
        <CardContent className="p-4">
          {countryLoading ? (
            <LoadingState />
          ) : (
            <CountryTable countries={countriesToDisplay} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Countries;