import type { DeckCard } from "../Stores";

// Shuffling code source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export function shuffle(cards: DeckCard[]) {
  const shuffled = cards;

  for (let i = shuffled.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
