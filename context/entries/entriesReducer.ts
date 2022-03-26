import { EntriesState } from './EntriesProvider';
import { Entry } from '../../interfaces/entry';

type ActionTypes = '[Entry] Add-entry';

interface IAction {
    type: ActionTypes;
    payload: Entry;
}

export const entriesReducer = (state: EntriesState, action: IAction): EntriesState => {
  switch (action.type) {
    case '[Entry] Add-entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };

    default:
      return state;
  }
};
