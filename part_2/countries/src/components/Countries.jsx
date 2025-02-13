const Countries = ({ filteredCountries, onSelectCountry }) => {
  return filteredCountries.map((country) => (
    <div key={country.name.common}>
      <p>
        {country.name.common}
        <button onClick={() => onSelectCountry(country)}>show</button>
      </p>
    </div>
  ))
}

export default Countries