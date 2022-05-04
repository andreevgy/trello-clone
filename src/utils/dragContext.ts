import React, {useContext} from 'react';

interface DragContext {
  dragId: string | null;
  setDragId: (id: string | null) => void;
}

export const DragContext = React.createContext<DragContext>({
  dragId: null,
  setDragId: () => {},
});

export const useDragContext = () => useContext(DragContext);
