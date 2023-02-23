import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from 'redux/contacts/slice';
import { selectContacts, selectFilter } from 'redux/selectors';

import css from './ContactList.module.css';

const ContactList = () => {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  function filteredContacts() {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const contactArr = filteredContacts();

  return (
    <ol className={css.list}>
      {contactArr.map(({ id, name, number }) => {
        return (
          <li className={css.item} key={id}>
            <p>
              {name}: {number}
            </p>

            <button
              className={css.button}
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              <RiDeleteBinLine height="30px" width="30px" />
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default ContactList;
