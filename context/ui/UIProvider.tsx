import { FC, useReducer } from 'react';
import { uiReducer } from './uiReducer';
import { UIContext } from './UIContext';

export interface UIState {
  sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false
};

export const UIProvider: FC = ({ children }) => {
  const [{ sidemenuOpen }, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' });

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' });

  return (
    <UIContext.Provider
      value={{
        sidemenuOpen,
        openSideMenu,
        closeSideMenu
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
