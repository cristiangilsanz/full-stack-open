const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Content = ({ parts }) => {
  return(
  <>
    {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
  </>
  )
}

const Part = ({ part: { name, exercises } }) => {
  return(
    <p>
      {name} {exercises}
    </p> 
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <p>Number of exercises {totalExercises}</p>;
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App