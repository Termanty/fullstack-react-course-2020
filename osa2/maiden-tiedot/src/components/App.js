import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ShowCountries } from './ShowCountries';
import { Filter } from './Filter';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState('')

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log('load ready');
        setCountries(response.data)
      })
  } ,[])

  useEffect(() => {
    if(filteredCountries.length === 1) {
    const api_key = process.env.REACT_APP_API_KEY
    const capital = filteredCountries[0].capital
    const url = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + capital
    axios
      .get(url)
      .then(response => {
        console.log('Load ready for weather')        
        setWeather(response.data)
      }) 
    }
  }, [countries, filter])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <ShowCountries filteredCountries={filteredCountries} setFilter={setFilter} weather={weather} />
    </div>
  );
}

export default App;
