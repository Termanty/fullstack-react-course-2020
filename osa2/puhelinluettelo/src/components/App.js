import React, { useState } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'

const phonebook = [
  { name: 'Arto Hellas', number: "040-1231244" },
  { name: 'Ada Lovelace', number: "+39 40 12335443" },
  { name: 'Matti Luukkainen', number: "050-55577555" },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
]

export const App = () => {
  const [persons, setPersons] = useState(phonebook)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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