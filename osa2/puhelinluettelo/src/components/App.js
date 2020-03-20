import React, { useState, useEffect } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
import axios from 'axios'

export const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('useEffect')
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log('response ', response);
        setPersons(response.data)
      })
  }, [])

  console.log('there is ' ,persons.length, ' person in phonebook');

  const onAdd = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  const handelNameChange = (event) => setNewName(event.target.value)
  const handelNumberChange = (event) => setNewNumber(event.target.value)
  const handelFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handelFilterChange={handelFilterChange} />
      
      <h3>add a new</h3>
      <PersonForm
        onAdd={onAdd}
        newName={newName}
        handelNameChange={handelNameChange}
        newNumber={newNumber}
        handelNumberChange={handelNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}