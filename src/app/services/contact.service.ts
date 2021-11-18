import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Contact } from '../models/contact';
import { LoadingContacts } from '../store/actions/contact.actions';
import { ContactState } from '../store/reducers/contact.reducer';

import { storageService } from './async-storage.service';

const ENTITY = 'contact';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private store: Store<ContactState>, private http: HttpClient) {
    // If empty - load test data to storage
    const contacts = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!contacts || contacts.length === 0) {
      //localStorage.setItem(ENTITY, JSON.stringify(this.createContacts()))
    }
  }
  query(filterBy = ''): Observable<Contact[]> {
    this.store.dispatch(new LoadingContacts());
    console.log('ContactService: Return Contacts ===> effect');
    const regex = new RegExp(filterBy, 'i')
    return (
      this.http.get(
        'https://candidate-test.herokuapp.com/contacts'
      ) as Observable<Contact[]>
    ).pipe(
      map((contacts) => contacts.filter((c) => regex.test(c.name) || regex.test(c.company_name)))
    )
  }

  getById(contactId: string): Observable<Contact> {
    console.log('ContactService: Return Contact ===> effect');
    return from(storageService.get(ENTITY, contactId) as Promise<Contact>);
  }

  remove(contactId: string): Observable<boolean> {
    console.log('ContactService: Removing Contacts ===> effect');
    return from(storageService.remove(ENTITY, contactId));
  }

  // save(contact: Contact): Observable<Contact> {
  //   const method = (contact.name) ? 'put' : 'post'
  //   const prmSavedContact = storageService[method](ENTITY, contact)
  //   console.log('ContactService: Saving Contact ===> effect');
  //   return from(prmSavedContact) as Observable<Contact>
  // }

  // private createContacts(): Contact[] {
  //   return ['Vue', 'Angular', 'React', 'Redux', 'NGRX', 'Vuex']
  //     .map(txt => ({id: storageService.makeId(), txt}))
  // }
  get emptyContact(): Contact {
    return {
      company_name: '',
      email: '',
      icon: '',
      job: '',
      name: '',
      phone: '',
      profile_image: '',
    };
  }
}
