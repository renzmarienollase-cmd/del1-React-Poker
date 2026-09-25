import CurrentBet from "../CurrentBet/CurrentBet";
import PayoutTable from "../PayoutTable/PayoutTable";
import Container from "../Container/Container";
import { useState } from "react";
import "./Game.css";
import { useGlobalStore } from "../../Stores";
import Card from "../Card/Card";
import PokerHand from "../PokerHand/PokerHand";
import {
  setHasJacksorBetter,
  setHasAPair,
  setHasTwoPairs,
  setHasThreeOfAKind,
  setIsAStraight,
  setIsAFlush,
  setHasFourOfAKind,
  setIsARoyal,
} from "../../functions/winChecks";
import type { DeckCard, PokerHandCard, WinCondition } from "../../Stores";

export default function Game() {
  const { deckCards, pokerHand, setPokerHand } = useGlobalStore();
  // These are block-scoped variables? What are those?
  const winConditionsList = useGlobalStore((store) => store.winConditionsList);
  const setPlayerCredits = useGlobalStore((store) => store.setPlayerCredits);

  const sessionId = sessionStorage.getItem("activePlayer");

  const id = Number(sessionId);

  const players = useGlobalStore((store) => store.players);

  const activePlayer = players.find((player) => player.id === id)!;

  const shuffledDeckCards = shuffle();

  const [currentDeckCards, setCurrentDeckCards] = useState(shuffledDeckCards);
  const [dealCount, setDealCount] = useState(0);
  const [currentBet, setCurrentBet] = useState<number>(1);

  const noWinCondition: WinCondition = {
    id: 0,
    name: "No win",
    payout: 0,
  };

  const [winCondition, setWinCondition] =
    useState<WinCondition>(noWinCondition);

  let realDealCount = dealCount;

  // TODO: Make it so that player can't bet midway in a round.
  // TODO: Not allowed to bet more than credits available.
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

  function determineWinCondition(pokerHand: PokerHandCard[]) {
    const cards: DeckCard[] = pokerHand.map((hand) => hand.card);

    const hasJacksorBetter = setHasJacksorBetter(cards);
    const hasAPair = setHasAPair(cards);
    const hasTwoPairs = setHasTwoPairs(cards);
    const hasThreeOfAKind = setHasThreeOfAKind(cards);
    const isAStraight = setIsAStraight(cards);
    const isAFlush = setIsAFlush(cards);
    const hasFourOfAKind = setHasFourOfAKind(cards);
    const isARoyal = setIsARoyal(cards);

    console.log(
      hasJacksorBetter,
      hasAPair,
      hasTwoPairs,
      hasThreeOfAKind,
      isAStraight,
      isAFlush,
      hasFourOfAKind,
      isARoyal,
    );

    if (isARoyal === true && isAFlush === true) {
      const condition = winConditionsList.find((item) => item.id === 1)!;

      return condition;
    }
    if (isAStraight && isAFlush) {
      const condition = winConditionsList.find((item) => item.id === 2)!;

      return condition;
    }
    if (hasFourOfAKind === true) {
      const condition = winConditionsList.find((item) => item.id === 3)!;

      return condition;
    }
    if (hasThreeOfAKind === true && hasAPair === true) {
      const condition = winConditionsList.find((item) => item.id === 4)!;

      return condition;
    }
    if (isAFlush === true) {
      const condition = winConditionsList.find((item) => item.id === 5)!;

      return condition;
    }
    if (isAStraight === true) {
      const condition = winConditionsList.find((item) => item.id === 6)!;

      return condition;
    }
    if (hasThreeOfAKind === true) {
      const condition = winConditionsList.find((item) => item.id === 7)!;

      return condition;
    }
    if (hasTwoPairs === true) {
      const condition = winConditionsList.find((item) => item.id === 8)!;

      return condition;
    }
    if (hasJacksorBetter === true) {
      const condition = winConditionsList.find((item) => item.id === 9)!;

      return condition;
    }

    return noWinCondition;
  }

  function handleClickDeal() {
    if (pokerHand.length === 0) {
      const newCards = currentDeckCards.slice(0, 5);
      const remainingDeckCards = currentDeckCards.slice(5);

      const newPokerHand = newCards.map((card) => ({
        card: card,
        isHeld: false,
      }));

      setPokerHand(newPokerHand);
      setCurrentDeckCards(remainingDeckCards);
      const winCondition = determineWinCondition(newPokerHand);
      return winCondition;
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

      setPokerHand(newPokerHand);
      const winCondition = determineWinCondition(newPokerHand);
      return winCondition;
    }

    if (realDealCount < 2) {
      realDealCount++;
    } else if (realDealCount === 2) {
      realDealCount = 0;
      setPokerHand([]);
    }

    if (realDealCount === 2) {
      //const newCredits = -currentBet;
      const newCredits = winCondition.payout * currentBet - currentBet;
      // const newPokerHand: PokerHandCard[] = [];

      setPlayerCredits(activePlayer.id, newCredits);
      //setPokerHand(newPokerHand);
      setWinCondition(noWinCondition);
    }

    setDealCount(realDealCount);
  }

  return (
    <Container as="section">
      <PayoutTable />
      <div className="bet-deal-bar">
        <CurrentBet betValue={currentBet} onBetClick={handleClickBet} />
        <button type="button" onClick={handleClickDeal} id="deal-button">
          Deal
        </button>
      </div>

      {realDealCount >= 1 && <p>{winCondition.name}</p>}
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
    </Container>
  );
}
