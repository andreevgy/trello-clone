import React, {useContext} from "react";
import {CardType} from "../Card";

interface CardsContextType {
  cards: CardType[];
  removeCard: (cardId: string, columnId: string) => void;
  moveCardBetweenColumns: (cardId: string, oldColumnId: string, newColumnId: string) => void;
}

export const CardsContext = React.createContext<CardsContextType>({
  cards: [],
  removeCard: () => {},
  moveCardBetweenColumns: () => {},
});

export const useCardsContext = () => useContext(CardsContext);

const fallbackCard = { name: "ERROR", content: "Card info not found, delete it?" };

export const getCardById = (cardId: string, cards: CardType[]) => {
  const foundCard = cards.find(c => c.id === cardId);
  return foundCard ?? fallbackCard
}
