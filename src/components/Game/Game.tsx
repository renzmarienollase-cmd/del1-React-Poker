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
import { shuffle } from "../../functions/shuffle";
import { useRef } from "react";
import TotalCoins from "../TotalCoins/TotalCoins";

export default function Game() {
  // Store states and actions
  const deckCards = useGlobalStore((store) => store.deckCards);
  const { pokerHand, setPokerHand } = useGameSessionStore();
  const winConditionsList = useGlobalStore((store) => store.winConditionsList);
  const { winCondition, setWinCondition } = useGameSessionStore();
  const setPlayerCoins = useGlobalStore((store) => store.setPlayerCoins);
  const activePlayer = useGameSessionStore((store) => store.activePlayer)!;

  // Component states
  const shuffledDeckCards = shuffle(deckCards);
  const [currentDeckCards, setCurrentDeckCards] = useState(shuffledDeckCards);
  const [currentBet, setCurrentBet] = useState<number>(1);
  const [dealCount, setDealCount] = useState(0);
  let realDealCount = dealCount;

  // GAME OVER
  const [gameOver, setGameOver] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };
  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  // TODO: Make it so that player can't bet midway in a round.
  // TODO: Not allowed to bet more than coins available.
  function handleClickBet() {
    if (currentBet < 5) {
      setCurrentBet(currentBet + 1);
    } else if (currentBet === 5) {
      setCurrentBet(1);
    }
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

  function handleGameOver() {
    // There's a flaw in the flow of logic here but I don't have time to fix it.

    if (realDealCount === 1) {
      const newCoins = winCondition.payout * currentBet - currentBet;

      setPlayerCoins(activePlayer.id, newCoins);
      setGameOver(!gameOver);
    }

    showGameOver();
  }

  function showGameOver() {
    if (gameOver === true) {
      openDialog();
    }
  }

  function resetGame() {
    setCurrentBet(1);
    setCurrentDeckCards(deckCards);
    setPokerHand([]);
    setWinCondition({
      id: 0,
      name: "",
      payout: 0,
    });
    closeDialog();
  }

  function handleClickDeal() {
    console.log("realDealCount on top of handleClickDeal", realDealCount);

    if (realDealCount < 2) {
      setDealCount(++realDealCount);
    } else if (realDealCount === 2) {
      setDealCount(0);
    }

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

    handleGameOver();
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

      <dialog ref={dialogRef} className="dialog-game-over">
        <span>GAME OVER</span>
        <br />
        <span>Your new Total </span>
        <TotalCoins id={activePlayer.id} />
        <button type="button" onClick={resetGame} className="primary-button">
          Okay
        </button>
      </dialog>
    </Container>
  );
}
