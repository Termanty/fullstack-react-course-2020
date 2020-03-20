import React from 'react';

export const Filter = ({ filter, setFilter }) => {
  return (<p>
    find countries
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
  </p>);
};
