import React, {useCallback, useState} from 'react';
import {useCardsContext, getCardById} from "../../utils/cardsContext";
import styles from './Card.module.scss';
import CardInput from "../CardInput";

export interface CardType {
  id: string;
  name: string;
  content: string;
}

interface CardProps {
  cardId: string;
}

const Card: React.FC<CardProps> = ({ cardId }) => {
  const { cards, changeCardData } = useCardsContext();
  const [isEditingActive, setIsEditingActive] = useState(false);
  const card = getCardById(cardId, cards);

  const onEdit = useCallback((name: string, content: string) => {
    changeCardData(cardId, name, content);
    setIsEditingActive(false);
  }, [changeCardData, cardId]);

  if (isEditingActive) {
    return <div className={styles.card}>
      <CardInput onSave={onEdit} defaultName={card.name} defaultContent={card.content} label="Edit card" />
    </div>
  }

  return <div className={styles.card}>
    <b>{ card.name }</b>
    <p>{ card.content }</p>
    <button onClick={() => setIsEditingActive(true)}>Edit card</button>
  </div>
}

export default Card;
