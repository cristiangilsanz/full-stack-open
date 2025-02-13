import { useState, useEffect } from 'react'

import personService from './services/persons'

import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch((error) => {
        setNotification({
          type: "error",
          text: "Error fetching phonebook data",
        })
      }) 
  }, [])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 4000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [notification])

  const handlePersonFormChange = (event) => {
    const { name, value } = event.target

    setNewPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }))
  }

  const handlePersonFormSubmit = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newPerson.name)
    
    if (existingPerson) {
      
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        
        const updatedPerson = { ...existingPerson, number: newPerson.number }
      
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((updatedPerson) => {
            setPersons(persons.map((person) => (person.id !== updatedPerson.id ? person : updatedPerson)))
            setNewPerson({ name: '', number: '' })
            setNotification({
              type: "success",
              text: `${updatedPerson.name} was succesfully updated`,
            })
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              setPersons((prevPersons) =>
                prevPersons.filter((person) => person.id !== existingPerson.id)
              )
              setNotification({
                type: "error",
                text: `Information of ${newPerson.name} has already removed from server`,
              })
            } else {
              setNotification({
                type: "error",
                text: error.response?.data?.error || "unknown error",
              })
            }
          })
      }

    } else {

      personService
      .create(newPerson)
      .then((addedPerson) => {
        setPersons(persons.concat(addedPerson))
        setNewPerson({ name: '', number: '' })
          setNotification({
            type: "success",
            text: `${addedPerson.name} was succesfully added`,
          })
        })
        .catch((error) => {
          setNotification({
            type: "error",
            text: error.response?.data?.error || "unknown error",
          })
        })
    }
  }

  const handlePersonDelete= (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      
      personService
        .remove(id)
        .then((deletedPerson)=>{
          setPersons(persons.filter((person) => person.id !== id))
          setNotification({
            type: "success",
            text: `${name} was succesfully deleted`,
          })
        })
        .catch((error) => {
          setNotification({
            type: "error",
            text: error.response?.data?.error || "unknown error",
          })
        })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
  ? persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  : persons

  return (
    <main>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newPerson={newPerson}
        handlePersonFormChange={handlePersonFormChange}
        handlePersonFormSubmit={handlePersonFormSubmit}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} handlePersonDelete={handlePersonDelete} />
    </main>
  )
}

export default App