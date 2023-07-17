import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './form/Form';
import { Header } from './header/Header';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = ({ name, number }) => {
    const ID = nanoid();
    const string = this.state.contacts.filter(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    string.length !== 0
      ? this.hendleCoincidence(name)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, { id: ID, name, number }],
        }));
  };

  hendleCoincidence(name) {
    alert(`${name} is already in contacts`);
  }

  // hendleSearch = event => {
  //   const value = event.currentTarget.value.toLowerCase().trim();
  //   this.setState({ filter: value });
  // };

  ChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  searchName = () => {
    const lowerCase = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCase)
    );
  };

  hendeleClickDelete = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <Header title={'Phonebook'} />
        <Form onSubmit={this.handleSubmit} contacts={contacts} />
        <Header title={'Contacts'} />
        <Filter OnChangeFilter={this.ChangeFilter} valueFilter={filter} />
        {contacts.length > 0 && (
          <ContactList
            contacts={this.searchName()}
            remove={this.hendeleClickDelete}
          />
        )}
      </>
    );
  }
}
