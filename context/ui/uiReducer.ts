import { UIState } from './UIProvider';

type ActionTypes = 'UI - Open Sidebar' | 'UI - Close Sidebar' | 'UI - Toggle Sidebar';

interface IAction {
  type: ActionTypes;
}

export const uiReducer = (state: UIState, action: IAction): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return { ...state, sidemenuOpen: true };

    case 'UI - Close Sidebar':
      return { ...state, sidemenuOpen: false };

    default:
      return state;
  }
};
