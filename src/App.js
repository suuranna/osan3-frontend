import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      //id: persons.length + 1,
      number: newNumber
    }
    
    let canBeAdded = true

    persons.forEach(each => {
      if (each.name === nameObject.name) {
        canBeAdded = false
      }
    })

    if (canBeAdded === false) {
      window.alert(`${nameObject.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName(nameObject.name)
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter/>
      <h3>add a new</h3>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={persons}/>
    </div>
  )
}

export default App
