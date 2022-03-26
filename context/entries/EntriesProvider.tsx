import { FC, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { EntriesContext } from './EntriesContext';
import { entriesReducer } from './entriesReducer';
import { Entry } from '../../interfaces/entry';

export interface EntriesState {
  entries: Entry[];
}

// eslint-disable-next-line camelcase
const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuid(),
      description: 'Pendiente: Cupidatat ut esse tempor adipisicing proident nisi consectetur culpa nulla excepteur.',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      _id: uuid(),
      description: 'Progreso: Cupidatat ut esse tempor adipisicing proident nisi consectetur culpa nulla excepteur.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      _id: uuid(),
      description: 'Terminadas: Cupidatat ut esse tempor adipisicing proident nisi consectetur culpa nulla excepteur.',
      status: 'finished',
      createdAt: Date.now() - 100000
    }
  ]
};

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = (entry: Entry) => {
    dispatch({
      type: '[Entry] Add-entry',
      payload: entry
    });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
