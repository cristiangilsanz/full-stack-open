const Filter = ({ filter, handleFilterChange }) => {
  return(
    <>
      <form>filter shown with <input id="filter" value={filter} onChange={handleFilterChange} /></form>
    </>
  )
}

export default Filter