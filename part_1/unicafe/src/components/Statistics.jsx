import StatisticLine from "./StatisticLine";

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

export default Statistics;