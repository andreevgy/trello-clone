import React, {useCallback, useState} from 'react';
import _ from 'lodash';
import './App.css';
import styles from './App.module.scss';
import { CardType } from "./components/Card";
import Column, {ColumnType} from "./components/Column";
import {CardsContext} from "./utils/cardsContext";
import ColumnInput from "./components/ColumnInput";

const generateRandomString = () => {
  return Math.round(Math.random() * 1000).toString();
}

function App() {
  const [columns, setColumns] = useState<ColumnType[]>([{ id: "1", name: "testColumn", cards: ["1"] }]);
  const [cards, setCards] = useState<CardType[]>([{ id: "1", content: "testContent", name: "testCardName" }]);

  const generateNewColumnId = useCallback(() => {
    const id = generateRandomString();
    if (columns.find(c => c.id === id)) {
      return generateRandomString();
    }
    return id;
  }, [columns]);

  const addColumn = useCallback((name: string) => {
    const id = generateNewColumnId();
    const column = { name, id, cards: [] };
    setColumns(cols => [..._.clone(cols), column])
  }, [generateNewColumnId]);

  const removeColumn = useCallback((id: string) => {
    const columnIndex = columns.findIndex(col => col.id === id);
    if (columnIndex === -1) return;
    const cardsIdsToRemove = columns[columnIndex].cards;
    setColumns((cols) => _.clone(cols).splice(columnIndex, 1));
    setCards(crds => crds.filter(c => !cardsIdsToRemove.includes(c.id)));
  }, [columns]);

  const addCardToColumn = useCallback((cardId: string, columnId: string) => {
    setColumns(cols => cols.map(c => {
      if (c.id !== columnId) return {...c};
      return { ...c, cards: [...c.cards, cardId] };
    }))
  }, []);

  const removeCardFromColumn = useCallback((cardId: string, columnId: string) => {
    setColumns(cols => cols.map(c => {
      if (c.id !== columnId) return {...c};
      return { ...c, cards: c.cards.filter(cId => cId !== cardId) };
    }))
  }, []);

  const generateNewCardId = useCallback(() => {
    const id = generateRandomString();
    if (cards.find(c => c.id === id)) {
      return generateRandomString();
    }
    return id;
  }, [cards]);

  const addCard = useCallback((name: string, content: string, columnId: string) => {
    const id = generateNewCardId();
    const card = { name, id, content };
    setCards(crds => [..._.clone(crds), card]);
    addCardToColumn(id, columnId);
  }, [generateNewCardId, addCardToColumn]);

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
      return { ..._.cloneDeep(col), name: newName };
    }));
  }, []);

  const changeCardData = useCallback((id: string, newName: string, newContent: string) => {
    setCards((cards) => cards.map(card => {
      if (card.id !== id) return _.clone(card);
      return { ...card, name: newName, content: newContent };
    }));
  }, []);

  return (
    <div className={styles.app}>
      <CardsContext.Provider value={{ cards, removeCard, moveCardBetweenColumns, changeCardData }}>
        {columns.map(column => <Column
          key={column.id}
          column={column}
          changeColumnName={changeColumnName}
          addCard={addCard}
        />)}
        <ColumnInput onSave={addColumn} />
      </CardsContext.Provider>
    </div>
  );
}

export default App;
