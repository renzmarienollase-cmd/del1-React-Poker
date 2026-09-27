// These are functions that check whether an array of cards contain a certain combination of card values.

import type { DeckCard } from "../Stores";

export function setHasJacksorBetter(cards: DeckCard[]) {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value >= 11) {
      return true;
    }
  }

  return false;
}

export function setHasAPair(cards: DeckCard[]) {
  let hits = 0;

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].value === cards[j].value) {
        hits++;
      }
    }
  }

  // Eliminates two pairs and cards of three and higher of a kind.
  if (hits > 1) {
    return false;
  } else if (hits === 1) {
    return true;
  }

  return false;
}

export function setHasTwoPairs(cards: DeckCard[]) {
  let hits = 0;

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].value === cards[j].value) {
        hits++;
      }
    }
  }

  // Eliminates possibility of four of a kind and three of a kind
  if (hits >= 3) {
    return false;
  } else if (hits === 2) {
    return true;
  }

  return false;
}

// Only works for five cards or fewer.
export function setHasThreeOfAKind(cards: DeckCard[]) {
  let hits = 0;

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].value === cards[j].value) {
        hits++;
        if (hits === 3) {
          return true;
        }
      }
    }
  }

  return false;
}

export function setIsAStraight(cards: DeckCard[]) {
  const sortedCards = cards.sort((a, b) => a.value - b.value);

  if (
    sortedCards[1].value === sortedCards[0].value + 1 &&
    sortedCards[2].value === sortedCards[1].value + 1 &&
    sortedCards[3].value === sortedCards[2].value + 1 &&
    sortedCards[4].value === sortedCards[3].value + 1
  ) {
    return true;
  }

  return false;
}

export function setIsAFlush(cards: DeckCard[]) {
  if (cards.every((card) => card.suite === cards[0].suite)) {
    return true;
  }

  return false;
}

export function setHasFourOfAKind(cards: DeckCard[]) {
  let hits = 0;

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].value === cards[j].value) {
        hits++;
        if (hits === 4) {
          return true;
        }
      }
    }
  }

  return false;
}

export function setIsARoyal(cards: DeckCard[]) {
  const sortedCards = cards.sort((a, b) => a.value - b.value);

  if (
    sortedCards[0].value === 1 &&
    sortedCards[1].value === 10 &&
    sortedCards[2].value === 11 &&
    sortedCards[3].value === 12 &&
    sortedCards[4].value === 13
  ) {
    return true;
  }

  return false;
}
