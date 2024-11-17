import course from "./assets/course.json";

import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;