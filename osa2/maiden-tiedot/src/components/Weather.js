import React from 'react';

export const Weather = ({ weather }) => {
  if (weather.location === undefined)
    return <></>;
  return (<>
    <h3>Weather in {weather.location.name}</h3>
    <p><b>temperature: </b>{weather.current.temperature} Celsius</p>
    <img src={weather.current.weather_icons[0]} alt={"weather icon"} />
    <p><b>wind: </b>{weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
  </>);
};
