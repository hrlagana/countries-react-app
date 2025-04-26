import { Input } from '@/components/ui/input';

interface Props {
  filter: string;
  onChange: (value: string) => void;
}

const CountryFilter = ({ filter, onChange }: Props) => {
  return (
    <Input
      placeholder="Filter by country code (e.g., GR)"
      value={filter}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default CountryFilter;