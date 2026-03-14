import courses from "./assets/courses.json"

import Course from "./components/Course"

const App = () => {
  
  return (
    <main>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </main>
  )

}

export default App