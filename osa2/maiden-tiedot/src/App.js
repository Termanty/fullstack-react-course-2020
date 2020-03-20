import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({ filter, setFilter }) => {
  return (
    <p>
        find countries
        <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
    </p>
  )
}

const ShowCountries = ({ filteredCountries }) => {
  console.log('filtered ', filteredCountries.length);

  if(filteredCountries.length > 10) {
    return <p>too many matcher, specify new filter</p>
  }

  if(filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <div>
        <h1>{country.name}</h1>
        <p>
          capital {country.capital}<br/>
          population {country.population}
        </p>
        <h3>languages</h3>
        <ul>
          {country.languages.map( lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={country.flag} height={100} width={100} />
      </div>
    )
  }
    
  return (
    <ul>
        {filteredCountries.map(country => <li key={country.name}>{country.name}</li>)}
    </ul>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log('load ready');
        setCountries(response.data)
      })
  } ,[])

  console.log('There is ', countries.length, ' in array')

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <ShowCountries filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;