import { useState } from 'react';
import useLocalStorage from '../useLocalStorage/useLocalStorage';
import Contacts from '../Contacts';
import Form from '../Form';
import Filter from '../Filter';
import { nanoid } from 'nanoid';

import React from 'react';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const isDuplicateContact = contacts.find(contact => contact.name === name);
    if (isDuplicateContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts([newContact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContacts = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = getVisibleContacts();
  return (
    <div>
      <div className="Wrapper">
        <h1 className="Title">Phonebook</h1>

        <Form onSubmit={addContact} />
      </div>
      <div className="Wrapper">
        <h2 className="Title">Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <Contacts contacts={visibleContacts} onDeleteContact={deleteContacts} />
      </div>
    </div>
  );
}
export default App;
