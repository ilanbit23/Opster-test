import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as contactModule from './reducers/contact.reducer';

import { environment } from '../../environments/environment';

export interface State {
  contactState: contactModule.ContactState;
}

export const reducers: ActionReducerMap<State> = {
  contactState: contactModule.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
