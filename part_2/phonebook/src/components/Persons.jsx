import Person from "./Person"

const Persons = ({ personsToShow, handlePersonDelete }) => {
  return(
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          <Person person={person} />
          <button onClick={() => handlePersonDelete(person.id, person.name)}>delete</button>
        </li>
      ))}
    </ul>
  )
}
  
export default Persons