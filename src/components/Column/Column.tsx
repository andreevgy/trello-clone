import React, {useCallback, useState} from 'react';
import Card from "../Card";
import styles from './Column.module.scss';
import ColumnInput from "../ColumnInput";
import CardInput from "../CardInput";

export interface ColumnType {
  id: string;
  name: string;
  cards: string[];
}

interface ColumnProps {
  column: ColumnType;
  changeColumnName: (id: string, name: string) => void;
  addCard: (name: string, content: string, columnId: string) => void;
}

const Column: React.FC<ColumnProps> = (props) => {
  const {column, changeColumnName, addCard} = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);

  const onEdit = useCallback((newName: string) => {
    changeColumnName(column.id, newName);
    setIsEditing(false);
  }, [changeColumnName, column]);

  const onCardCreation = useCallback((name: string, content: string) => {
    addCard(name, content, column.id);
    setIsCreateCardOpen(false);
  }, [column, addCard]);

  return <div className={styles.column}>
    {!isEditing
      ? <h4 onClick={() => setIsEditing(true)}>{column.name}</h4>
      : <ColumnInput onSave={onEdit} defaultName={column.name} label="Edit column" />
    }
    {!isEditing && <div onClick={() => setIsEditing(true)}>Edit column</div>}
    <div>
      {column.cards.map(c => <Card cardId={c} columnId={column.id} key={c}/>)}
    </div>
    {!isCreateCardOpen && <button onClick={() => setIsCreateCardOpen(true)}>Add card</button>}
    {isCreateCardOpen && <CardInput onSave={onCardCreation} />}
  </div>
}

export default Column;
