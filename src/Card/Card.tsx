import React from 'react';
import {useCardsContext, getCardById} from "../utils/cardsContext";

export interface CardType {
  id: string;
  name: string;
  content: string;
}

interface CardProps {
  cardId: string;
}

const Card: React.FC<CardProps> = ({ cardId }) => {
  const { cards } = useCardsContext();
  const card = getCardById(cardId, cards);

  return <div>
    <b>{ card.name }</b>
    <p>{ card.content }</p>
  </div>
}

export default Card;
