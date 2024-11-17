const Part = ({ part: { name, exercises } }) => {
    return(
      <p>
        {name} {exercises}
      </p> 
    )
}

export default Part;