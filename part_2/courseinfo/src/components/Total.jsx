const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return <p><b>total of {totalExercises} exercises</b></p>;
}

export default Total;