import { createContext } from 'react';

interface ContextProps {
  // Properties
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  openAddingEntry: (isOpen: boolean) => void;
  startDragging: () => void;
  stopDragging: () => void;
}

export const UIContext = createContext(<ContextProps>{});
