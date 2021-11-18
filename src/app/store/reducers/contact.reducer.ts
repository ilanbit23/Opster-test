import { SET_LOADING, LOADED_CONTACTS, REMOVED_CONTACT, ADDED_CONTACT, UPDATED_CONTACT, LOADED_CONTACT, SET_ERROR } from '../actions/contact.actions';
import { Contact } from 'src/app/models/contact';

export interface ContactState {
  contacts: Contact[];
  contact: Contact | null;
  isLoading: boolean;
  error: string;
}

const initialState: ContactState = {
  contacts: [],
  contact: null,
  isLoading: false,
  error: ''
};

export function reducer(state: ContactState = initialState, action: any): ContactState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      console.log(`Reducer: Setting isLoading to ${isLoading}`);
      return { ...state, isLoading, error: '' };
    } case SET_ERROR: {
      const { error } = action;
      console.log(`Reducer: Setting contact error`, error);
      return { ...state, error, isLoading: false };
    } case LOADED_CONTACTS: {
      const { contacts } = action;
      console.log(`Reducer: Setting loaded contacts (${contacts.length}) contacts`);
      return { ...state, contacts, isLoading: false, error: '' };
    } case LOADED_CONTACT: {
      const { contact } = action;
      console.log(`Reducer: Setting loaded contact ${contact.name}`);
      return { ...state, contact, error: '' };
    } case REMOVED_CONTACT: {
      const { contactId } = action;
      console.log('Reducer: Removing contact:', contactId);
      const contacts = state.contacts.filter(contact => contact.name !== contactId)
      return { ...state, contacts, error: '' };
    } case ADDED_CONTACT: {
      const { contact } = action;
      console.log('Reducer: Adding contact:', contact);
      const contacts = [...state.contacts, contact]
      return { ...state, contacts, error: '' };
    } case UPDATED_CONTACT: {
      const { contact } = action;
      console.log('Reducer: Updating contact:', contact);
      const contacts = state.contacts.map(currContact => (currContact.name === contact.name) ? contact : currContact)
      return { ...state, contacts, contact: null, error: '' };
    } default:
      return state;
  }
}
