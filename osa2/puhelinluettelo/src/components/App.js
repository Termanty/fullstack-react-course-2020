import React, { useState, useEffect } from 'react'
import { Notification } from './Notification'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
import personServices from '../services/persons'
import '../index.css'

export const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  useEffect(() => {
    if(notification === null) return
    setNewName('')
    setNewNumber('')  
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }, [notification])

  const addContact = () => {
    const newContact = { name: newName, number: newNumber }
    personServices
      .create(newContact)
      .then(response => {
        setPersons(persons.concat(response))
        setNotification({ message: `Added ${response.name}`, type: 'notification' })
      })
      .catch(error => {
        setNotification({ message: error.response.data.error, type: 'error'})
      })
  }

  const updatePhoneNumber = () => {
    const p = persons.find(p => p.name === newName)
    const updatedContact = { id: p.id, name: newName, number: newNumber }
    personServices
      .update(updatedContact)
      .then(response => {
        setPersons(persons.map(person => {
          if(person.name === newName) {
            return { id: response.id, name: response.name, number: response.number }
          } else { 
            return { id: person.id, name: person.name, number: person.number } 
          }
        }))
        setNotification({ message: `Updated number for ${response.name}`, type: "notification" })
      })
      .catch(result => {
        setPersons(persons.filter(person => person.id !== p.id))
        setNotification({ message: `Information of ${p.name} has been removed from server`, type: "error" })
      })
  }

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
      const personToDelete = persons.find(p => p.id === id).name
      if(!window.confirm(`Delete ${personToDelete}`)) return
      personServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({ message: `Deleted ${personToDelete}`, type: "notification" })
        })
    }
  }

  const handelNameChange = (event) => setNewName(event.target.value)
  const handelNumberChange = (event) => setNewNumber(event.target.value)
  const handelFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <Notification notification={notification} />
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