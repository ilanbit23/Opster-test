import { Action } from '@ngrx/store';
import { Contact } from 'src/app/models/contact';

export const SET_LOADING = '[contact] loading';
export const SET_ERROR = '[contact] error';
export const LOAD_CONTACTS = '[contact]s load';
export const LOAD_CONTACT = '[contact] load';
export const LOADED_CONTACT = '[contact] loaded';
export const LOADED_CONTACTS = '[contact]s loaded';
export const REMOVE_CONTACT = '[contact] remove';
export const REMOVED_CONTACT = '[contact] removed';
export const SAVE_CONTACT = '[contact] saved';
export const ADDED_CONTACT = '[contact] added';
export const UPDATED_CONTACT = '[contact] updated';

export type ContactAction = LoadContacts | LoadContact | SaveContact;

export class LoadContacts implements Action {
  readonly type = LOAD_CONTACTS;
  constructor(public filterBy: string = '') {}
}
export class LoadContact implements Action {
  readonly type = LOAD_CONTACT;
  constructor(public contactId: string = '') {}
}

export class LoadedContacts implements Action {
  readonly type = LOADED_CONTACTS;
  constructor(public contacts: Contact[] = []) {}
}
export class LoadedContact implements Action {
  readonly type = LOADED_CONTACT;
  constructor(public contact: Contact) {}
}
export class RemovedContact implements Action {
  readonly type = REMOVED_CONTACT;
  constructor(public contactId: string) {}
}
export class SaveContact implements Action {
  readonly type = SAVE_CONTACT;
  constructor(public contact: Contact) {}
}
export class AddedContact implements Action {
  readonly type = ADDED_CONTACT;
  constructor(public contact: Contact) {}
}
export class UpdatedContact implements Action {
  readonly type = UPDATED_CONTACT;
  constructor(public contact: Contact) {}
}
export class LoadingContacts implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) {}
}
export class ContactError implements Action {
  readonly type = SET_ERROR;
  constructor(public error: string) {}
}
