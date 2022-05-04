import React, {useCallback, useState} from 'react';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';

interface Column {
  id: String;
  name: String;
  cards: String[];
}

interface Card {
  id: String;
  name: String;
  content: String;
}

const generateRandomString = () => {
  return Math.round(Math.random() * 1000).toString();
}

function App() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  const generateNewColumnId = useCallback(() => {
    const id = generateRandomString();
    if (columns.find(c => c.id === id)) {
      return generateRandomString();
    }
    return id;
  }, [columns]);

  const addColumn = useCallback((name: String) => {
    const id = generateNewColumnId();
    const column = { name, id, cards: [] };
    setColumns(cols => [..._.clone(cols), column])
  }, [generateNewColumnId]);

  const removeColumn = useCallback((id: String) => {
    const columnIndex = columns.findIndex(col => col.id === id);
    if (columnIndex === -1) return;
    const cardsIdsToRemove = columns[columnIndex].cards;
    setColumns((cols) => _.clone(cols).splice(columnIndex, 1));
    setCards(crds => crds.filter(c => !cardsIdsToRemove.includes(c.id)));
  }, [columns]);

  const addCardToColumn = useCallback((cardId: String, columnId: String) => {
    setColumns(cols => cols.map(c => {
      if (c.id !== columnId) return {...c};
      return { ...c, cards: [...c.cards, columnId] };
    }))
  }, []);

  const removeCardFromColumn = useCallback((cardId: String, columnId: String) => {
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

  const addCard = useCallback((name: String, content: String, columnId: String) => {
    const id = generateNewCardId();
    const card = { name, id, content };
    setCards(crds => [..._.clone(crds), card]);
    addCardToColumn(id, columnId);
  }, [generateNewCardId, addCardToColumn]);

  const moveCardBetweenColumns = useCallback((cardId: String, oldColumnId: String, newColumnId: String) => {
    addCardToColumn(cardId, newColumnId);
    removeCardFromColumn(cardId, oldColumnId);
  }, [addCardToColumn, removeCardFromColumn]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
