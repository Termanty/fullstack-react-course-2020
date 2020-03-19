import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.map(part => part.exercises).reduce((acc, cur) => acc + cur)
  return (
    <p><b>total of {sum} exercises</b></p>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <ul style={{listStyle: "none", paddingLeft: "0"}}>
      {course.parts.map(part => <li key={part.id}><Part part={part} /></li>)}
    </ul>
  )
}

export const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}