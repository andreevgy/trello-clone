import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useCardsContext, getCardById} from "../../utils/cardsContext";
import styles from './Card.module.scss';
import CardInput from "../CardInput";
import {useColumnContext} from "../../utils/columnsContext";

export interface CardType {
  id: string;
  name: string;
  content: string;
}

interface CardProps {
  cardId: string;
  columnId: string;
}

const Card: React.FC<CardProps> = ({ cardId, columnId }) => {
  const { cards, changeCardData, moveCardBetweenColumns } = useCardsContext();
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [isMovingDropdownActive, setIsMovingDropdownActive] = useState(false);
  const card = getCardById(cardId, cards);
  const { columns } = useColumnContext();

  const onEdit = useCallback((name: string, content: string) => {
    changeCardData(cardId, name, content);
    setIsEditingActive(false);
  }, [changeCardData, cardId]);

  const colsToMove = useMemo(() => {
    return columns
      .filter(c => c.id !== columnId)
      .map(c => ({ name: c.name, id: c.id }));
  }, [columns, columnId])

  const onMove = useCallback((newColId: string) => {
    setIsMovingDropdownActive(false);
    moveCardBetweenColumns(cardId, columnId, newColId);
  }, [columnId, cardId, moveCardBetweenColumns]);

  if (isEditingActive) {
    return <div className={styles.card}>
      <CardInput onSave={onEdit} defaultName={card.name} defaultContent={card.content} label="Edit card" />
    </div>
  }

  return <div className={styles.card}>
    <b>{ card.name }</b>
    <p>{ card.content }</p>
    <button onClick={() => setIsEditingActive(true)}>Edit card</button>
    {!!colsToMove.length && <button onClick={() => setIsMovingDropdownActive(v => !v)}>Move card</button>}
    {isMovingDropdownActive && <div>
      {
        colsToMove.map(c => <div key={c.id} onClick={() => onMove(c.id)}>
          {c.name}
        </div>)
      }
    </div>}
  </div>
}

export default Card;
