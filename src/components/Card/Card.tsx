import React, {useMemo, useState} from 'react';
import styles from './Card.module.scss';
import CardInput from "../CardInput";
import {useBoardContext} from "../../utils/boardContext";
import {useDragContext} from "../../utils/dragContext";

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
  const { cards, columns, changeCardData, moveCardBetweenColumns, removeCard } = useBoardContext();
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [isMovingDropdownActive, setIsMovingDropdownActive] = useState(false);
  const { dragId } = useDragContext();
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
      <CardInput onSave={onEdit} defaultName={card.name} defaultContent={card.content} label="Editing card" />
    </div>
  }

  return <div className={styles.card} draggable onDragEnd={() => moveCardBetweenColumns(cardId, columnId, dragId!)}>
    <b className={styles.title}>{ card.name }</b>
    <p className={styles.content}>{ card.content }</p>
    <button onClick={() => setIsEditingActive(true)}>Edit card</button>
    <button onClick={() => removeCard(cardId, columnId)}>Delete card</button>
    <div className={styles.moveDropdownRoot}>
      {!!colsToMove.length && <button onClick={() => setIsMovingDropdownActive(v => !v)}>Move card</button>}
      {isMovingDropdownActive && <div className={styles.moveDropdownContent}>
        {
          colsToMove.map(c => <div key={c.id} onClick={() => onMove(c.id)} className={styles.moveItem}>
            {c.name}
          </div>)
        }
			</div>}
    </div>

  </div>
}

export default Card;
