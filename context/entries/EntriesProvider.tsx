import { FC, useReducer, useEffect } from 'react';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import { Entry } from '../../interfaces/entry';
import { entriesApi } from '../../axios';
import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[];
}

// eslint-disable-next-line camelcase
const Entries_INITIAL_STATE: EntriesState = {
  entries: []
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (entry: Entry) => {
    const { data } = await entriesApi.post<Entry>('/entries', entry);

    dispatch({
      type: '[Entry] Add-entry',
      payload: data
    });
  };

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
      dispatch({ type: '[Entry] Update-entry', payload: data });
      if (showSnackbar) {
        enqueueSnackbar('Entrada Actualizada Correctamente', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
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
