import React, {useCallback, useState} from 'react';
import './App.css';
import styles from './App.module.scss';
import Column from "./components/Column";
import ColumnInput from "./components/ColumnInput";
import {useBoard} from "./utils/useBoard";
import {BoardContext} from "./utils/boardContext";
import {DragContext} from "./utils/dragContext";

function App() {
  const board = useBoard();
  const [isCreateNewOpen, setIsCreateNewOpen] = useState(false);
  const [dragId, setDragId] = useState<null | string>(null);

  const onCreate = useCallback((name: string) => {
    board.addColumn(name);
    setIsCreateNewOpen(false);
  }, [board]);

  return (
    <div className={styles.app}>
      <BoardContext.Provider value={board}>
        <DragContext.Provider value={{ dragId, setDragId }}>
          {board.columns.map(column => <Column
            key={column.id}
            column={column}
            changeColumnName={board.changeColumnName}
            addCard={board.addCard}
            deleteColumn={board.removeColumn}
          />)}
          {isCreateNewOpen && <ColumnInput onSave={onCreate}/>}
          {!isCreateNewOpen && <div className={styles.newButtonWrapper}>
						<button onClick={() => setIsCreateNewOpen(true)}>Create new column</button>
					</div>}
        </DragContext.Provider>
      </BoardContext.Provider>
    </div>
  );
}

export default App;
