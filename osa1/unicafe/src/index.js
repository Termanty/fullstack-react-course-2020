import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ feedback, onClick }) => {
  return <button onClick={onClick}>{feedback}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <>
        <StatisticLine name="good" value={good} />
        <StatisticLine name="neutral" value={neutral} />
        <StatisticLine name="bad" value={bad} />
        <StatisticLine name="all" value={all} />
        <StatisticLine name="average" value={(good - bad) / all} />
        <StatisticLine name="positive" value={good / all} postfix="%" />
      </>
    )
  }
}

const StatisticLine = ({ name, value, postfix }) => {
  return <p>{name} {value}{postfix}</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClick = (feedback, setFeedback) => {
    return () => {
      setFeedback(feedback + 1)
    }
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={onClick(good, setGood)} feedback="good" />
      <Button onClick={onClick(neutral, setNeutral)} feedback="neutral" />
      <Button onClick={onClick(bad, setBad)} feedback="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))