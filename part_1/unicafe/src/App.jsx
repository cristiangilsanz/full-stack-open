import { useState } from 'react';

import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <main>
      <section>
          <h1>give feedback</h1>
            
          <Button setFeedback={setGood} feedbackAttribute={good} text="good"></Button>
          <Button setFeedback={setNeutral} feedbackAttribute={neutral} text="neutral"></Button>
          <Button setFeedback={setBad} feedbackAttribute={bad} text="bad"></Button>
      </section>
    
      <Statistics good={good} neutral={neutral} bad={bad} />
    </main>
  )
}

export default App;