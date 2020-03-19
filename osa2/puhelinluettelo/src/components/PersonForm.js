import React from 'react';

export const PersonForm = ({ onAdd, newName, handelNameChange, newNumber, handelNumberChange }) => {
  return (<form onSubmit={onAdd}>
    <div>
      name: <input value={newName} onChange={handelNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handelNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>);
};