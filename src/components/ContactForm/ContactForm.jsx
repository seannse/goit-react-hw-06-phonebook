import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addContact } from 'redux/contacts/slice';
import { selectContacts } from 'redux/selectors';

import css from './ContactForm.module.css';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  function handleChange({ target }) {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      contacts.some(
        ({ name: nameFromReduxState }) =>
          nameFromReduxState.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      Notify.failure(`${name} is already in contacts!`);
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        <p>Name</p>
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={css.label}>
        <p>Number</p>
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
}

export default ContactForm;
