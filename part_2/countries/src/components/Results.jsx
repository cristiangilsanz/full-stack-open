import Countries from "./Countries";
import Country from "./Country";

const Results = ({ countries , onSelectCountry }) => {
    if (countries.length > 10) {
      return <p>Too many matches ({countries.length}), specify another filter</p>;
    }
  
    if (countries.length > 1 && countries.length <= 10) {
      return <Countries filteredCountries={countries} onSelectCountry={onSelectCountry} />;
    }
  
    if (countries.length === 1) {
      return <Country selectedCountry={countries[0]} />;
    }
  
    return <p>No matches</p>;
  };
  
export default Results