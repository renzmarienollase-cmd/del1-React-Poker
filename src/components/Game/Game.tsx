//import CurrentBet from "../CurrentBet/CurrentBet";
//import PayoutTable from "../PayoutTable/PayoutTable";
import { useState } from "react";
import "./Game.css";
import { useGlobalStore } from "../../Store";
import Card from "../Card/Card";
import PokerHand from "../PokerHand/PokerHand";

export default function Game() {
  const deckCards = useGlobalStore((store) => store.deckCards);
  const pokerHand = useGlobalStore((store) => store.pokerHand);
  const setpokerHand = useGlobalStore((store) => store.setPokerHand);

  const shuffledDeckCards = shuffle();
  const [currentDeckCards, setCurrentDeckCards] = useState(shuffledDeckCards);
  const [dealCount, setDeadlCount] = useState(0);

  //const [currentBet, setCurrentBet] = useState<number>(1);

  // TO DO
  // use const heldCards = pokerHand.filter...isHeld true blabla to filter cards that are "held" by the player
  // use splice to insert new cards into player hand using the index of the cards that were removed

  /*   function handleClickBet() {
    if (currentBet < 5) {
      setCurrentBet(currentBet + 1);
    } else if (currentBet === 5) {
      setCurrentBet(1);
    }
  } */

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
    debugger;
    if (pokerHand.length === 0) {
      const newCards = currentDeckCards.slice(0, 5);
      const remainingDeckCards = currentDeckCards.slice(5);

      const newPokerHand = newCards.map((card) => ({
        card: card,
        isHeld: false,
      }));

      setpokerHand(newPokerHand);
      setCurrentDeckCards(remainingDeckCards);
      setDeadlCount(dealCount + 1);
      console.log(dealCount);
    } else {
      const newPokerHand = pokerHand.map((hand) => {
        if (hand.isHeld === false) {
          const newCard = {
            card: currentDeckCards.splice(0, 1)[0],
            isHeld: false,
          };

          const remainingDeckCards = currentDeckCards.slice(1);

          setCurrentDeckCards(remainingDeckCards);
          return newCard;
        } else {
          return hand;
        }
      });

      setpokerHand(newPokerHand);
      setDeadlCount(dealCount + 1);
      console.log(dealCount);
    }
  }

  return (
    <section>
      {/* <PayoutTable /> */}
      {/*       <CurrentBet betValue={currentBet} onBetClick={handleClickBet} /> */}
      <button type="button" onClick={handleClickDeal}>
        Deal
      </button>
      {pokerHand.length === 0 ? (
        <div className="poker-hand">
          <Card variant="back" />
          <Card variant="back" />
          <Card variant="back" />
          <Card variant="back" />
          <Card variant="back" />
        </div>
      ) : (
        <PokerHand />
      )}
    </section>
  );
}
