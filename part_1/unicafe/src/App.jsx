import { useState } from 'react'

const Button = ({setFeedback, feedbackAttribute, text}) => {
  const increaseFeedbackCount = (setFeedback, feedbackAttribute) => () => {
    setFeedback(feedbackAttribute + 1)
  }
    
  return(
    <button onClick={increaseFeedbackCount(setFeedback, feedbackAttribute)}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => { 
  const totalFeedbackSent = good + neutral + bad
  const averageScore = totalFeedbackSent ? ((good - bad) / totalFeedbackSent).toFixed(2) : 0
  const goodFeedbackRate = totalFeedbackSent ? ((good / totalFeedbackSent) * 100).toFixed(2) : 0

  return (
    <section>
      <h1>statistics</h1>
      {totalFeedbackSent ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={totalFeedbackSent} />
            <StatisticLine text="average" value={averageScore} />
            <StatisticLine text="positive" value={goodFeedbackRate + " %"} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </section>
  );
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}: </td>
      <td>{value}</td>
    </tr>
    );
};


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

export default App
