import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { State } from '../../store/store';
import { LoadContacts } from '../../store/actions/contact.actions';
import { Contact } from '../../models/contact';

@Component({
  selector: 'contact-app',
  templateUrl: './contact-app.component.html',
  styleUrls: ['./contact-app.component.scss'],
})
export class ContactAppComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  contact$: Observable<Contact | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  addingNew = false;

  constructor(private store: Store<State>) {
    this.contacts$ = this.store.select('contactState').pipe(pluck('contacts'));
    this.contact$ = this.store.select('contactState').pipe(pluck('contact'));
    this.isLoading$ = this.store
      .select('contactState')
      .pipe(pluck('isLoading'));
    this.error$ = this.store.select('contactState').pipe(pluck('error'));
  }

  ngOnInit(): void {
    this.loadContacts('');
  }
  loadContacts(filterBy: string) {
    console.log('contactApp: dispatching LoadContacts => effects');
    this.store.dispatch(new LoadContacts(filterBy));
  }
}
