import axios from 'axios';
import Person from './Person'
import bookService from '../services/phonebookService';



const List = ({ personsToShow, persons, setPersons }) => {

    const handleDelete = (name, id) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            bookService
                .del(id)
                .catch(err =>
                    alert(`${name} already deleted`))

            setPersons(persons.filter(p => p.id !== id))
        }

    }

    return (
        personsToShow.map(person => <Person key={person.id}
            person={person} handelClick={() => handleDelete(person.name, person.id)} />)
    )
}

export default List