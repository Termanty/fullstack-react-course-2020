import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ShowCountries } from './ShowCountries';
import { Filter } from './Filter';

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
      <ShowCountries filteredCountries={filteredCountries} setFilter={setFilter} />
    </div>
  );
}

export default App;
