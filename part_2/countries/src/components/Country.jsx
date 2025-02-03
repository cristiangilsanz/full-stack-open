import Weather from "./Weather";

const Country = ({ selectedCountry }) => {
  
  const {
    name: { common } = { common: "unknown" },
    capital = ["unknown"],
    area = "unknown",
    languages = {},
    flags: { png, alt } = { png: "unknown", alt: "Flag" },
    capitalInfo: { latlng: [lat = null, lon = null] = [null, null] } = {},
  } = selectedCountry || {};

  return (
    <div>
      <h2>{common}</h2>
      <p>capital: {capital[0]}</p>
      <p>area: {area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.keys(languages).length > 0
          ? Object.keys(languages).map((key) => (
              <li key={key}>{languages[key]}</li>
            ))
          : <li>unknown</li>}
      </ul>
      <img src={png} alt={alt} />

      {lat !== null && lon !== null ? (
        <Weather capital={capital[0]} lat={lat} lon={lon} />
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default Country