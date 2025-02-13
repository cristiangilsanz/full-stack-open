import { useState, useEffect } from "react"

import getCountries from "./services/countries"

import Filter from "./components/Filter"
import Results from "./components/Results"

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([])
  
  useEffect(() => {
    getCountries().then((allCountries) => {
      setCountries(allCountries)
    })
  }, [])
  
  const handleFilterChange = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase()
    setFilter(searchTerm)

    const filteredCountries = countries.filter(
      (country) => country.name.common.toLowerCase().includes(searchTerm)
    )
    setFilteredCountries(filteredCountries)
  }

  const handleCountrySelect = (country) => {
    setFilteredCountries([country])
  }

  return (
    <main>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Results countries={filteredCountries} onSelectCountry={handleCountrySelect} />
    </main>
  )
}

export default App