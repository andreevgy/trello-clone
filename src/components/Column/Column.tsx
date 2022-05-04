import React, {useCallback, useState} from 'react';
import Card from "../Card";
import styles from './Column.module.scss';
import ColumnInput from "../ColumnInput";

export interface ColumnType {
  id: string;
  name: string;
  cards: string[];
}

interface ColumnProps {
  column: ColumnType;
  changeColumnName: (id: string, name: string) => void;
}

const Column: React.FC<ColumnProps> = ({column, changeColumnName}) => {
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = useCallback((newName: string) => {
    changeColumnName(column.id, newName);
    setIsEditing(false);
  }, [changeColumnName, column]);

  return <div className={styles.column}>
    {!isEditing
      ? <h4 onClick={() => setIsEditing(true)}>{column.name}</h4>
      : <ColumnInput onSave={onEdit} defaultName={column.name} label="Edit column" />
    }
    {!isEditing && <div onClick={() => setIsEditing(true)}>Edit card</div>}
    <div>
      {column.cards.map(c => <Card cardId={c} key={c}/>)}
    </div>
  </div>
}

export default Column;
