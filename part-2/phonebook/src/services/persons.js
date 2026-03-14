import axios from 'axios'

// To run the app using the local JSON server with the db.json file, set VITE_API_ENDPOINT="http://localhost:3001/persons" in your .env file.
// Alternatively, you can uncomment the 'rewrite' line in vite.config.js to enable the API path rewriting when using the JSON server (db.json).

const baseUrl = import.meta.env.VITE_API_ENDPOINT ?? '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}
  
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

export default {getAll, create, remove, update}