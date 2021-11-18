import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Contact } from '../../models/contact';
import { SaveContact } from '../../store/actions/contact.actions';
import { State } from '../../store/store';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  contact$: Observable<Contact | null>;
  contact = { company_name: '', email: '', icon: '', job: '', name: '', phone: '', profile_image: '' }
  @Output() saved = new EventEmitter();
  sub: Subscription | null = null;

  constructor(private store: Store<State>) {
    this.contact$ = this.store.select('contactState').pipe(pluck('contact'));
  }
  get contactEditState() {
    return (this.contact.name)? 'Update' : 'Add'
  }

  ngOnInit(): void {
    this.sub = this.contact$.subscribe(contact => {
      console.log('Got Contact to Edit', contact);
      if (contact) this.contact = JSON.parse(JSON.stringify(contact))
      // else this.saved.emit() // This fails due to Angular behavior (problem with the intial emit)
    })

  }
  saveContact() {
    this.store.dispatch(new SaveContact(this.contact));
    console.log('Saving: ', this.contact);
    // TODO: Figure a way to know that saving was done before closing here
    this.saved.emit();
  }
  ngOnDestroy() {
    this.sub?.unsubscribe()
  }

}
