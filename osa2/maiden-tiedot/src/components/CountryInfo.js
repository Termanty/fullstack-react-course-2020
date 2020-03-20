import React from 'react'
import { Weather } from './Weather'

export const CountryInfo = ({ country, weather }) => {  
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
    <img src={country.flag} height={100} width={100} alt={'flag of '+ country.name}/>
    <Weather weather={weather} />
  </div>);
};
