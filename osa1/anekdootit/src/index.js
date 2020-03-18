import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const onClickNext = () => setSelected(Math.floor(Math.random() * 6))
  const onClickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = () => {
    let highest = 0
    for(let i = 0; i < 6; i++) {
      if(votes[i] > votes[highest]) {
        highest = i
      }
    }
    return highest
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} vote{votes[selected] === 1 ? "" : "s"}</p>
      <button onClick={onClickVote}>vote</button>
      <button onClick={onClickNext}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes()]}</p>
      <p>has {votes[mostVotes()]} vote{votes[mostVotes()] === 1 ? "" : "s"}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)