import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form';
import List from './components/List'
import bookService from './services/phonebookService';
import Notification from './components/Notification';
import './index.css'

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        bookService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        // check if name already exists in the phonebook
        if (persons.some(x => x.name === newName)) {
            const person = persons.filter(x => x.name === newName)
            // console.log(person[0])
            if (person[0].name === newName && person[0].number === newNumber) {
                alert(`${newName} already in phonebook`)
            }
            else {
                if (window.confirm(`${newName} already in phonebook, replace the old number with a new one`)) {
                    const nameObject = {
                        ...person[0],
                        number: newNumber,
                    }
                    bookService
                        .update(person[0].id, nameObject)
                        .then(response => {
                            setPersons(persons.map(x => x.name === newName ? response.data : x))
                            setMsg(`Updated ${newName}`)
                            setTimeout(() => setMsg(null), 15000)
                        })
                        .catch(error => {
                            console.log(error.response)
                            setMsg(error.response.data.error)
                            setTimeout(() => setMsg(null), 5000)
                        })
                }
            }
        }
        // otherwise creates new object for that name
        else {
            const nameObject = {
                name: newName,
                number: newNumber
            }
            bookService
                .create(nameObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setMsg(`Added ${newName}`)
                    setTimeout(() => setMsg(null), 5000)
                })
                .catch(error => {
                    // console.log(error.response.data)
                    setMsg(error.response.data.error)
                    setTimeout(() => setMsg(null), 5000)
                })


        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        // console.log(event.target.value);
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        // console.log(event.target.value);
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }



    // if no filter specified then show all names otherwise show only the matching names
    const personsToShow = filter === ''
        ? persons
        : persons.filter(person => person.name.toLocaleLowerCase().startsWith(filter) || person.name.startsWith(filter))

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={msg} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <Form addPerson={addPerson} newName={newName} newNumber={newNumber}
                handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <ul>
                <List personsToShow={personsToShow} persons={persons} setPersons={setPersons} />
            </ul>
        </div>
    )
}

export default App;
