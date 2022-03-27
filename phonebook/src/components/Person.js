

const Person = ({ person, handelClick }) => {
    return (

        <li>
            {person.name} {person.number}
            <button onClick={handelClick}>
                delete
            </button>
        </li>

    )
}

export default Person