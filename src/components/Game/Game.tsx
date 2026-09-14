import Card from "../Card/Card";
import CurrentBet from "../CurrentBet/CurrentBet";
import PayoutTable from "../PayoutTable/PayoutTable";
import { useState } from "react";
import "./Game.css";
import { useGlobalStore, type DeckCard } from "../../Store";

export default function Game() {
  const deckCards = useGlobalStore((store) => store.deckCards);
  const [currentBet, setCurrentBet] = useState<number>(1);
  const [currentDeckCards, setCurrentDeckCards] = useState(deckCards);
  const [playerHand, setPlayerHand] = useState<DeckCard[]>([]);

  function handleClickBet() {
    if (currentBet < 5) {
      setCurrentBet(currentBet + 1);
    } else if (currentBet === 5) {
      setCurrentBet(1);
    }
  }

  // Shuffling code source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  function shuffleDeckCards() {
    const shuffled = [...currentDeckCards];

    for (let i = shuffled.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  function handleClickDeal() {
    const shuffledDeckCards = shuffleDeckCards();

    setCurrentDeckCards(shuffledDeckCards);
  }

  return (
    <section>
      <PayoutTable />
      <CurrentBet betValue={currentBet} onBetClick={handleClickBet} />
      <button type="button" onClick={handleClickDeal}>
        Deal
      </button>
      <div className="player-hand">
        {currentDeckCards.map((card) => (
          <Card key={card.id} suite={card.suite} value={card.value} />
        ))}
      </div>
    </section>
  );
}
