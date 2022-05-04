import React from 'react';
import './App.css';
import styles from './App.module.scss';
import Column from "./components/Column";
import ColumnInput from "./components/ColumnInput";
import {useBoard} from "./utils/useBoard";
import {BoardContext} from "./utils/boardContext";

function App() {
  const board = useBoard();

  return (
    <div className={styles.app}>
      <BoardContext.Provider value={board}>
        {board.columns.map(column => <Column
          key={column.id}
          column={column}
          changeColumnName={board.changeColumnName}
          addCard={board.addCard}
          deleteColumn={board.removeColumn}
        />)}
        <ColumnInput onSave={board.addColumn}/>
      </BoardContext.Provider>
    </div>
  );
}

export default App;
