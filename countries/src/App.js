import axios from 'axios'
import { useEffect, useState } from 'react'
import SingleCountry from './components/SingleCountry'


const Country = ({ country }) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <p>
        {country.name.common}
        <button onClick={() => setShow(!show)}>
          {show ? 'hide' : 'show'}
        </button>
      </p>
      {show && <SingleCountry country={country} />}
    </>
  )
}

const App = () => {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  // const [filtered, setFiltered] = useState([])


  // fetch from the rest-api the data of all countries
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // this handles the changes in the search bar
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    console.log(search)
  }


  // it takes the input from the search bar and saves the countries that match that search by using filter method
  let filtered = []
  if (search !== '') {
    filtered = countries.filter(country => country.name.common.includes(search) ||
      country.name.common.toLowerCase().includes(search))
  }


  return (
    <div>
      find countries <input value={search}
        onChange={handleSearchChange} />
      <Content filtered={filtered} search={search} />
    </div>
  )
}


const Content = ({ filtered, search }) => {

  const numCountries = filtered.length

  if (numCountries > 10) {
    return (
      <p>To many matchs, specify another filter</p>
    )
  }

  if (numCountries <= 10 && numCountries > 1) {
    return (
      filtered.map(c => <Country key={c.name.common} country={c} />)
    )
  }

  if (numCountries === 1) {
    return (
      filtered.map(c => <SingleCountry key={c.name.common} country={c} />)
    )
  }

  if (numCountries === 0 && search !== '') {
    return (
      <p>No match!</p>
    )
  }

  return null
}

export default App;
