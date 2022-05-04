import React, {useMemo, useState} from 'react';
import styles from './Card.module.scss';
import CardInput from "../CardInput";
import {useBoardContext} from "../../utils/boardContext";

export interface CardType {
  id: string;
  name: string;
  content: string;
}

interface CardProps {
  cardId: string;
  columnId: string;
}

const fallbackCard = { name: "ERROR", content: "Card info not found, delete it?" };

export const getCardById = (cardId: string, cards: CardType[]) => {
  const foundCard = cards.find(c => c.id === cardId);
  return foundCard ?? fallbackCard
}

const Card: React.FC<CardProps> = ({ cardId, columnId }) => {
  const { cards, columns, changeCardData, moveCardBetweenColumns } = useBoardContext();
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [isMovingDropdownActive, setIsMovingDropdownActive] = useState(false);
  const card = getCardById(cardId, cards);

  const colsToMove = useMemo(() => {
    return columns
      .filter(c => c.id !== columnId)
      .map(c => ({ name: c.name, id: c.id }));
  }, [columns, columnId])

  const onEdit = (name: string, content: string) => {
    changeCardData(cardId, name, content);
    setIsEditingActive(false);
  };

  const onMove =(newColId: string) => {
    setIsMovingDropdownActive(false);
    moveCardBetweenColumns(cardId, columnId, newColId);
  };

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
