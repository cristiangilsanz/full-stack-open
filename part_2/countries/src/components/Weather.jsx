import { useState, useEffect } from "react";

import getWeather from "../services/weather";

const Weather = ({ capital, lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather(lat, lon).then((weather) => {
      setWeather(weather);
    });
  }, [lat, lon]);

  return (
    <>
      <h2>Weather in {capital}</h2>
      {weather === null ? (
        <p>Fetching weather data...</p>
      ) : (
        <>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default Weather;