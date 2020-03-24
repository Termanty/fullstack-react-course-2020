import React from 'react';

const PersonItem = ({ person, onDelete }) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={onDelete(person.id)}>delete</button>
    </li>
  )
}

export const Persons = ({ persons, filter, onDelete }) => {
  return (<ul>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => <PersonItem person={person} onDelete={onDelete} key={person.name} />)}
  </ul>);
};