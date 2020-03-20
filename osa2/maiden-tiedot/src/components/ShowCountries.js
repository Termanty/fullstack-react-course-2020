import React from 'react';
import { CountryInfo } from './CountryInfo';
import { CountriesList } from './CountriesList';

export const ShowCountries = ({ filteredCountries, setFilter, weather }) => {
  if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]} weather={weather} />
  }
  if (filteredCountries.length <= 10) { 
    return <CountriesList filteredCountries={filteredCountries} setFilter={setFilter} />
  }
  return <p>too many matches, specify new filter</p>
}
