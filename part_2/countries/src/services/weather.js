import axios from "axios"

const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY


const baseUrl = `https://api.openweathermap.org/data/2.5/weather`

const getWeather = (lat, lon) => {
  const request = axios.get(
    `${baseUrl}?lat=${lat}&lon=${lon}&appid=${VITE_WEATHER_API_KEY}&units=metric`
  )
  return request.then((response) => response.data)
}

export default getWeather