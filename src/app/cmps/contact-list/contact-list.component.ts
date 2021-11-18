import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[] | null = [];
  @Output() removed = new EventEmitter<string>()
  @Output() edited = new EventEmitter<string>()
  constructor() {}

  ngOnInit(): void {}

}
