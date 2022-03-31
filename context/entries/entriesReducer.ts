import { EntriesState } from './EntriesProvider';
import { Entry } from '../../interfaces/entry';

type EntriesActionType =
  | { type: '[Entry] Add-entry', payload: Entry }
  | { type: '[Entry] Update-entry', payload: Entry }
  | { type: '[Entry] Initial-entries', payload: Entry[] };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case '[Entry] Add-entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };

    case '[Entry] Update-entry':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            return action.payload;
          }
          return entry;
        })
      };

    case '[Entry] Initial-entries':
      return {
        ...state,
        entries: [...action.payload]
      };

    default:
      return state;
  }
};
