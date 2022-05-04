import React from 'react';
import Card from "../Card";

export interface ColumnType {
  id: string;
  name: string;
  cards: string[];
}

interface ColumnProps {
  column: ColumnType
}

const Column: React.FC<ColumnProps> = ({column}) => {
  return <div>
    <h4>{column.name}</h4>
    <div>
      {column.cards.map(c => <Card cardId={c} key={c} />)}
    </div>
  </div>
}

export default Column;
