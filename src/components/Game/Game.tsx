import Card from "../Card/Card";
import CurrentBet from "../CurrentBet/CurrentBet";
import PayoutTable from "../PayoutTable/PayoutTable";
import { useState } from "react";
import "./Game.css";
import { useGlobalStore } from "../../Store";

export default function Game() {
  const deckCards = useGlobalStore((store) => store.deckCards);
  const playerHand = useGlobalStore((store) => store.playerHand);
  const setPlayerHand = useGlobalStore((store) => store.setPlayerHand);

  const shuffledDeckCards = shuffle();
  const [currentDeckCards, setCurrentDeckCards] = useState(shuffledDeckCards);

  const [currentBet, setCurrentBet] = useState<number>(1);

  // TO DO
  // use const heldCards = playerHand.filter...isHeld true blabla to filter cards that are "held" by the player
  // use splice to insert new cards into player hand using the index of the cards that were removed

  function handleClickBet() {
    if (currentBet < 5) {
      setCurrentBet(currentBet + 1);
    } else if (currentBet === 5) {
      setCurrentBet(1);
    }
  }

  // Shuffling code source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  function shuffle() {
    const shuffled = [...deckCards];

    for (let i = shuffled.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  function handleClickDeal() {
    if (playerHand.length === 0) {
      const newPlayerHand = currentDeckCards.slice(0, 5);
      const remainingDeckCards = currentDeckCards.splice(
        5,
        currentDeckCards.length,
      );

      setPlayerHand(newPlayerHand);
      setCurrentDeckCards(remainingDeckCards);
    }
  }

  return (
    <section>
      <PayoutTable />
      <CurrentBet betValue={currentBet} onBetClick={handleClickBet} />
      <button type="button" onClick={handleClickDeal}>
        Deal
      </button>
      <div className="player-hand">
        {playerHand.length === 0 ? (
          <span>No hand to display.</span>
        ) : (
          playerHand.map((card) => (
            <div key={card.id}>
              <Card suite={card.suite} value={card.value} />
              <button type="button">Hold</button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
