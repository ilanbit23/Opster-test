import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact: Contact | null = null;
  isExtended = false
  constructor(private contactList: ContactListComponent) {

  }

  ngOnInit(): void {}
}
