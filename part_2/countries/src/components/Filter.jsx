const Filter = ({ filter, handleFilterChange }) => {
    return (
      <div>
        find countries
        <input id="filter" value={filter} onChange={handleFilterChange} />
      </div>
    );
  };

export default Filter
