import { Country } from "@/typings";

interface Props {
    countries: Country[];
  }
  
const CountryTable = ({ countries }: Props) => {
    return (
        <table className="w-full text-left">
            <thead>
                <tr className="border-b">
                <th className="w-2/3 py-2 px-4">Country Name</th>
                <th className="w-1/3 py-2 px-4">Country Code</th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country) => (
                <tr key={country.code} className="border-b hover:bg-muted">
                    <td className="w-2/3 py-2 px-4">{country.name}</td>
                    <td className="w-1/3 py-2 px-4">{country.code}</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CountryTable;