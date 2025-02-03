const PersonForm = ({ newPerson, handlePersonFormChange, handlePersonFormSubmit }) => {
  return(
    <form onSubmit={handlePersonFormSubmit}>
        <div>name: <input  id="name" name="name" value={newPerson.name} onChange={handlePersonFormChange} autoComplete="Bob" /></div>
        <div>number: <input  id="number" name="number" value={newPerson.number} onChange={handlePersonFormChange} autoComplete="000-123456" /></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  ) 
}
  
export default PersonForm