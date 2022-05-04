import {useCallback, useEffect, useState} from "react";
import {ColumnType} from "../components/Column";
import {CardType} from "../components/Card";
import _ from "lodash";
import {v4 as uuid} from "uuid";

export const useBoard = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);

  useEffect(() => {
    if (isLocalStorageLoaded) {
      localStorage.setItem('cards', JSON.stringify(cards));
    }
  }, [cards, isLocalStorageLoaded]);

  useEffect(() => {
    if (isLocalStorageLoaded) {
      localStorage.setItem('columns', JSON.stringify(columns));
    }
  }, [columns, isLocalStorageLoaded]);

  useEffect(() => {
    const columnsStorage = localStorage.getItem('columns');
    if (columnsStorage) {
      setColumns(JSON.parse(columnsStorage));
    }
    const cardsStorage = localStorage.getItem('cards');
    if (cardsStorage) {
      setCards(JSON.parse(cardsStorage));
    }
    setIsLocalStorageLoaded(true);
  }, []);

  const addColumn = useCallback((name: string) => {
    const id = uuid();
    const column = {name, id, cards: []};
    setColumns(cols => [..._.clone(cols), column])
  }, []);

  const removeColumn = useCallback((id: string) => {
    const columnIndex = columns.findIndex(col => col.id === id);
    if (columnIndex === -1) return;
    const cardsIdsToRemove = columns[columnIndex].cards;
    setColumns((cols) => {
      const newCols = _.clone(cols);
      newCols.splice(columnIndex, 1);
      return newCols;
    });
    setCards(crds => crds.filter(c => !cardsIdsToRemove.includes(c.id)));
  }, [columns]);

  const addCardToColumn = useCallback((cardId: string, columnId: string) => {
    setColumns(cols => cols.map(c => {
      if (c.id !== columnId) return {...c};
      return {...c, cards: [...c.cards, cardId]};
    }))
  }, []);

  const removeCardFromColumn = useCallback((cardId: string, columnId: string) => {
    setColumns(cols => cols.map(c => {
      if (c.id !== columnId) return {...c};
      return {...c, cards: c.cards.filter(cId => cId !== cardId)};
    }))
  }, []);

  const addCard = useCallback((name: string, content: string, columnId: string) => {
    const id = uuid();
    const card = {name, id, content};
    setCards(crds => [..._.clone(crds), card]);
    addCardToColumn(id, columnId);
  }, [addCardToColumn]);

  const moveCardBetweenColumns = useCallback((cardId: string, oldColumnId: string, newColumnId: string) => {
    addCardToColumn(cardId, newColumnId);
    removeCardFromColumn(cardId, oldColumnId);
  }, [addCardToColumn, removeCardFromColumn]);

  const removeCard = useCallback((cardId: string, columnId: string) => {
    removeCardFromColumn(cardId, columnId);
    setCards(crds => crds.filter(card => card.id !== cardId));
  }, [removeCardFromColumn]);

  const changeColumnName = useCallback((id: string, newName: string) => {
    setColumns(cols => cols.map(col => {
      if (col.id !== id) return _.cloneDeep(col);
      return {..._.cloneDeep(col), name: newName};
    }));
  }, []);

  const changeCardData = useCallback((id: string, newName: string, newContent: string) => {
    setCards((cards) => cards.map(card => {
      if (card.id !== id) return _.clone(card);
      return {...card, name: newName, content: newContent};
    }));
  }, []);

  return {
    columns,
    cards,
    addColumn,
    removeColumn,
    addCardToColumn,
    removeCardFromColumn,
    addCard,
    moveCardBetweenColumns,
    removeCard,
    changeColumnName,
    changeCardData
  }
}
