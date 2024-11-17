import { useState } from 'react'
import { anecdotes } from './anecdotes';

const App = () => {
  const [selected, setSelected] = useState(0)

  const chooseNextAnecdote = () => {
    let newSelected;
    do {
      newSelected = Math.floor(Math.random() * anecdotes.length);
    } while (newSelected === selected);
    setSelected(newSelected);
  };

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const submitVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }  
  
  const mostVoted = votes.indexOf(Math.max(...votes))

  return (
    <main>
      <section>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={submitVote}>vote</button>
        <button onClick={chooseNextAnecdote}>next anecdote</button>
      </section>

      <section>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[mostVoted]}</p>
        <p>has {votes[mostVoted]} votes</p>
      </section>
    </main>
    )
}

export default App
