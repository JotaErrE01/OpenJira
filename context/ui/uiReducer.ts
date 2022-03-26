import { UIState } from './UIProvider';

type ActionTypes = 'UI - Open Sidebar' | 'UI - Close Sidebar' | 'UI - Toggle Adding Entry' | 'UI - Start Dragging' | 'UI - End Dragging';

interface IAction {
  type: ActionTypes;
  payload?: boolean;
}

export const uiReducer = (state: UIState, action: IAction): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return { ...state, sidemenuOpen: true };

    case 'UI - Close Sidebar':
      return { ...state, sidemenuOpen: false };

    case 'UI - Toggle Adding Entry':
      return {
        ...state,
        isAddingEntry: !state.isAddingEntry
      };

    case 'UI - Start Dragging':
      return {
        ...state,
        isDragging: true
      };

    case 'UI - End Dragging':
      return {
        ...state,
        isDragging: false
      };

    default:
      return state;
  }
};
