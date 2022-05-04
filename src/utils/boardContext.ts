import React, {useContext} from 'react';
import {useBoard} from "./useBoard";

export const BoardContext = React.createContext<ReturnType<typeof useBoard>>({
  columns: [],
  cards: [],
  changeColumnName: () => {},
  changeCardData:() => {},
  moveCardBetweenColumns: () => {},
  removeColumn: () => {},
  removeCard: () => {},
  removeCardFromColumn: () => {},
  addCard: () => {},
  addColumn: () => {},
  addCardToColumn: () => {},
});

export const useBoardContext = () => useContext(BoardContext);
