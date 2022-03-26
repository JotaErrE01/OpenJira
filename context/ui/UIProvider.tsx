import { FC, useReducer } from 'react';
import { uiReducer } from './uiReducer';
import { UIContext } from './UIContext';

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false
};

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' });

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' });

  const openAddingEntry = (isOpen: boolean) => dispatch({ type: 'UI - Toggle Adding Entry', payload: isOpen });

  const startDragging = () => dispatch({ type: 'UI - Start Dragging' });

  const stopDragging = () => dispatch({ type: 'UI - End Dragging' });

  return (
    <UIContext.Provider
      value={{
        ...state,

        // functions
        openSideMenu,
        closeSideMenu,
        openAddingEntry,
        startDragging,
        stopDragging
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
