import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '@/graphql/queries';
import { Card, CardContent } from '@/components/ui/card';
import { filterCountriesByCode } from '@/utils/filter.util';
import CountryFilter from './CountryFilter';
import CountryTable from './CountryTable';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const Countries = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [filterText, setFilterText] = useState('');

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  const filteredCountries = filterCountriesByCode(data.countries, filterText);

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-4 min-h-screen">
      <Card>
        <CardContent className="p-4">
          <CountryFilter filter={filterText} onChange={setFilterText} />
        </CardContent>
      </Card>

      <Card className="opacity-90">
        <CardContent className="p-4">
          <CountryTable countries={filteredCountries} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Countries;