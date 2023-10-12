import { combineReducers } from 'redux';
import contactsReducer from './slices/contacts';
import { ContactState } from './types/contacts';

export interface InitialRootState {
  contact: ContactState;
}


const combinedReducer = combineReducers({
  contact: contactsReducer,
});

export {  combinedReducer };
