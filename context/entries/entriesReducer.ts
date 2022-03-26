import { EntriesState } from './EntriesProvider';

type ActionTypes = '';

interface IAction {
    type: ActionTypes;
    payload?: any;
}

export const entriesReducer = (state: EntriesState, action: IAction): EntriesState => {
  switch (action.type) {
    // case '':
    //   return { ...state, :  };

    default:
      return state;
  }
};
