import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import { ContactAction, SAVE_CONTACT, ADDED_CONTACT, UPDATED_CONTACT, LOAD_CONTACTS, LOADED_CONTACTS, REMOVE_CONTACT, REMOVED_CONTACT, LOAD_CONTACT, LOADED_CONTACT, SET_ERROR } from './actions/contact.actions';

@Injectable()
export class AppEffects {

  loadContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_CONTACTS),
      tap(() => console.log('Effects: load contacts ==> service')),
      switchMap((action) =>
        this.contactService.query(action.filterBy).pipe(
          tap(() => console.log('Effects: Got contacts from service, send it to ===> Reducer')),
          map((contacts) => ({
            type: LOADED_CONTACTS,
            contacts,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  });
  loadContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_CONTACT),
      tap(() => console.log('Effects: load contact ==> service')),
      switchMap((action) =>
        this.contactService.getById(action.contactId).pipe(
          tap(() => console.log('Effects: Got contact from service ===> Reducer')),
          map((contact) => ({
            type: LOADED_CONTACT,
            contact
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });
  // removeContact$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(REMOVE_CONTACT),
  //     switchMap((action) =>
  //       this.contactService.remove(action.contactId).pipe(
  //         tap(() => console.log('Effects: Contact removed by service ===> Reducer')),
  //         map(() => ({
  //           type: REMOVED_CONTACT,
  //           contactId: action.contactId,
  //         })),
  //         catchError((error) => {
  //           console.log('Effect: Caught error ===> Reducer', error)
  //           return of({
  //             type: SET_ERROR,
  //             error: error.toString(),
  //           })
  //         })
  //       )
  //     ),
  //   );
  // })
  // saveContact$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(SAVE_CONTACT),
  //     switchMap((action) =>
  //       this.contactService.save(action.contact).pipe(
  //         tap(() => console.log('Effects: Contact saved by service, inform the ===> Reducer')),
  //         map((savedContact) => ({
  //           type: (action.contact.name) ? UPDATED_CONTACT : ADDED_CONTACT,
  //           contact: savedContact,
  //         })),
  //         catchError((error) => {
  //           console.log('Effect: Caught error ===> Reducer', error)
  //           return of({
  //             type: SET_ERROR,
  //             error: error.toString(),
  //           })
  //         })

  //       )
  //     )
  //   );
  // })
  constructor(
    private actions$: Actions<ContactAction>,
    private contactService: ContactService
  ) { }
}
