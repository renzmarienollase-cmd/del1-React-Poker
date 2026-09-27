// This component is the actual Poker game itself.

import CurrentBet from "../CurrentBet/CurrentBet";
import PayoutTable from "../PayoutTable/PayoutTable";
import Container from "../Container/Container";
import { useState } from "react";
import "./Game.css";
import { useGameSessionStore, useGlobalStore } from "../../Stores";
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
import type { DeckCard, PokerHandCard } from "../../Stores";

export default function Game() {
  const deckCards = useGlobalStore((store) => store.deckCards);
  const { pokerHand, setPokerHand } = useGameSessionStore();
  // These are block-scoped variables? What are those?
  const winConditionsList = useGlobalStore((store) => store.winConditionsList);
  //const setPlayerCredits = useGlobalStore((store) => store.setPlayerCredits);

  //const activePlayer = useGameSessionStore((store) => store.activePlayer)!;

  const shuffledDeckCards = shuffle();

  const [currentDeckCards, setCurrentDeckCards] = useState(shuffledDeckCards);
  const [dealCount, setDealCount] = useState(0);
  const [currentBet, setCurrentBet] = useState<number>(1);

  const { winCondition, setWinCondition } = useGameSessionStore();

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

    let winConditionId = 0;

    if (isARoyal && isAFlush) {
      winConditionId = 1;
    } else if (isAStraight && isAFlush) {
      winConditionId = 2;
    } else if (hasFourOfAKind) {
      winConditionId = 3;
    } else if (hasThreeOfAKind && hasAPair) {
      winConditionId = 4;
    } else if (isAFlush) {
      winConditionId = 5;
    } else if (isAStraight) {
      winConditionId = 6;
    } else if (hasThreeOfAKind) {
      winConditionId = 7;
    } else if (hasTwoPairs) {
      winConditionId = 8;
    } else if (hasJacksorBetter) {
      winConditionId = 9;
    }

    const condition = winConditionsList.find(
      (item) => item.id === winConditionId,
    )!;

    setWinCondition(condition);
  }

  function handleClickDeal() {
    setDealCount(++realDealCount);

    if (pokerHand.length === 0) {
      const newCards = currentDeckCards.slice(0, 5);
      const remainingDeckCards = currentDeckCards.slice(5);

      const newPokerHand = newCards.map((card) => ({
        card: card,
        isHeld: false,
      }));

      setPokerHand(newPokerHand);
      setCurrentDeckCards(remainingDeckCards);
      determineWinCondition(newPokerHand);
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
      determineWinCondition(newPokerHand);
    }
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
