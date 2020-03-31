import React, { useState, useEffect } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
import personServices from '../services/persons'

export const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('useEffect')
    personServices
      .getAll()
      .then(data => {
        console.log('response ', data);
        setPersons(data)
      })
  }, [])

  const addContact = () => {
    const newContact = { name: newName, number: newNumber }
    personServices
      .create(newContact)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
      })
  }

  const updatePhoneNumber = () => {
    const p = persons.find(p => p.name === newName)
    const updatedContact = { id: p.id, name: newName, number: newNumber }
    personServices
      .update(updatedContact)
      .then(data => {
        setPersons(persons.map(person => {
          if(person.name === newName) {
            return { id: data.id, name: data.name, number: data.number }
          } else { 
            return { id: person.id, name: person.name, number: person.number } 
          }
        }))
        setNewName('')
        setNewNumber('')
      })
  }

  console.log('there is ' ,persons.length, ' person in phonebook');

  const onAdd = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, do you want to change phone number`)) {
        updatePhoneNumber()
      }
    } else {
      addContact()
    } 
  }

  const onDelete = (id) => {
    return () => {
      if(window.confirm(`Delete ${persons.find(p => p.id === id).name}`)) {
        personServices
          .remove(id)
          .then(() => {
            console.log('deleted ' + id)
            setPersons(persons.filter(person => person.id !== id))
          })
      }
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
      <Persons persons={persons} filter={filter} onDelete={onDelete} />
    </div>
  )
}