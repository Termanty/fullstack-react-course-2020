import React from 'react';

export const Filter = ({ filter, handelFilterChange }) => {
  return (<p>
    filter shown with
      <input value={filter} onChange={handelFilterChange} />
  </p>);
};