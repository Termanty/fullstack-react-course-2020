import React from 'react';

const CountryListItem = ({ country, setFilter }) => {
  return (
    <li>
        {country.name}
        <button onClick={() => setFilter(country.name)}>show</button>
    </li>
  )
}

export const CountriesList = ({ filteredCountries, setFilter }) => {
  return (<ul>
    {filteredCountries
      .map(country => <CountryListItem country={country} setFilter={setFilter} key={country.name} />)}
  </ul>);
};
