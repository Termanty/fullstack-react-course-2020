import React from 'react';

export const ShowCountries = ({ filteredCountries, setFilter }) => {
  if (filteredCountries.length > 10) {
    return (<p>
      too many matcher, specify new filter
      </p>);
  }
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (<div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}<br />
        population {country.population}
      </p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} height={100} width={100} />
    </div>);
  }
  return (<ul>
    {filteredCountries.map(country => {
      return (<li key={country.name}>
        {country.name}
        <button onClick={() => setFilter(country.name)}>show</button>
      </li>);
    })}
  </ul>);
};
