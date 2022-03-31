import { FC, useReducer, useEffect } from 'react';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import { Entry } from '../../interfaces/entry';
import { entriesApi } from '../../axios';

export interface EntriesState {
  entries: Entry[];
}

// eslint-disable-next-line camelcase
const Entries_INITIAL_STATE: EntriesState = {
  entries: []
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (entry: Entry) => {
    dispatch({
      type: '[Entry] Add-entry',
      payload: entry
    });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] Update-entry', payload: entry });
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');

    dispatch({
      type: '[Entry] Initial-entries',
      payload: data
    });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
