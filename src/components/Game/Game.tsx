// This component is the actual Poker game itself.

import CurrentBet from "../CurrentBet/CurrentBet";
import PayoutTable from "../PayoutTable/PayoutTable";
import PlayerHand from "../PlayerHand/PlayerHand";
import { useState } from "react";
import "./Game.css";
import { useGameSessionStore, useGlobalStore } from "../../Stores";
import Card from "../Card/Card";
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
import type { PlayingCard, PlayerHandCard } from "../../Stores";
import { shuffle } from "../../functions/shuffle";
import { useRef } from "react";
import TotalCoins from "../TotalCoins/TotalCoins";

export default function Game() {
  // Store states and actions
  const deckCards = useGlobalStore((store) => store.deckCards);
  const { playerHand, setPlayerHand } = useGameSessionStore();
  const pokerHandsList = useGlobalStore((store) => store.pokerHandsList);
  const { pokerHand, setPokerHand } = useGameSessionStore();
  const setPlayerCoins = useGlobalStore((store) => store.setPlayerCoins);
  const activePlayer = useGameSessionStore((store) => store.activePlayer)!;
  const { currentDeckCards, setCurrentDeckCards, setDiscardedDeckCards } =
    useGameSessionStore();

  // Component states
  const shuffledPlayingCards = shuffle(deckCards);
  const [currentBet, setCurrentBet] = useState<number>(1);
  const [dealCount, setDealCount] = useState(0);
  let realDealCount = dealCount;

  // GAME OVER
  const [gameOver, setGameOver] = useState(false);
  const dialogGameOver = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    if (dialogGameOver.current) dialogGameOver.current.showModal();
  };
  const closeDialog = () => {
    if (dialogGameOver.current) dialogGameOver.current.close();
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

  function determinePokerHand(playerHand: PlayerHandCard[]) {
    const cards: PlayingCard[] = playerHand.map((hand) => hand.card);

    const hasJacksorBetter = setHasJacksorBetter(cards);
    const hasAPair = setHasAPair(cards);
    const hasTwoPairs = setHasTwoPairs(cards);
    const hasThreeOfAKind = setHasThreeOfAKind(cards);
    const isAStraight = setIsAStraight(cards);
    const isAFlush = setIsAFlush(cards);
    const hasFourOfAKind = setHasFourOfAKind(cards);
    const isARoyal = setIsARoyal(cards);

    let pokerHandId = 0;

    if (isARoyal && isAFlush) {
      pokerHandId = 1;
    } else if (isAStraight && isAFlush) {
      pokerHandId = 2;
    } else if (hasFourOfAKind) {
      pokerHandId = 3;
    } else if (hasThreeOfAKind && hasAPair) {
      pokerHandId = 4;
    } else if (isAFlush) {
      pokerHandId = 5;
    } else if (isAStraight) {
      pokerHandId = 6;
    } else if (hasThreeOfAKind) {
      pokerHandId = 7;
    } else if (hasTwoPairs) {
      pokerHandId = 8;
    } else if (hasJacksorBetter) {
      pokerHandId = 9;
    }

    const condition = pokerHandsList.find((item) => item.id === pokerHandId)!;

    setPokerHand(condition);
  }

  function handleGameOver() {
    // There's a flaw in the flow of logic here but I don't have time to fix it.

    if (realDealCount === 1) {
      const newCoins = pokerHand.payout * currentBet - currentBet;

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
    setCurrentDeckCards(shuffledPlayingCards);
    setPlayerHand([]);
    setPokerHand({
      id: 0,
      name: "",
      payout: 0,
    });
    closeDialog();
  }

  function handleClickDeal() {
    if (realDealCount < 2) {
      setDealCount(++realDealCount);
    } else if (realDealCount === 2) {
      setDealCount(0);
    }

    if (playerHand.length === 0) {
      const newCards = shuffledPlayingCards.slice(0, 5);
      const newPlayerHand = newCards.map((card) => ({
        card: card,
        isHeld: false,
      }));
      setPlayerHand(newPlayerHand);
      determinePokerHand(newPlayerHand);

      const newDeck = shuffledPlayingCards.slice(5);
      setCurrentDeckCards(newDeck);
    } else {
      const newPlayerHand = playerHand.map((hand) => {
        if (hand.isHeld === false) {
          const newCard = {
            card: currentDeckCards.splice(0, 1)[0],
            isHeld: false,
          };

          const newDeck = currentDeckCards.slice(1);
          setCurrentDeckCards(newDeck);

          const discardedDeckCard = hand.card;
          setDiscardedDeckCards(discardedDeckCard);

          return newCard;
        } else {
          return hand;
        }
      });

      setPlayerHand(newPlayerHand);
      determinePokerHand(newPlayerHand);
    }

    handleGameOver();
  }

  return (
    <section className="game-container">
      <PayoutTable />
      <div className="bet-deal-bar">
        <CurrentBet betValue={currentBet} onBetClick={handleClickBet} />
        <button type="button" onClick={handleClickDeal} id="deal-button">
          Deal
        </button>
      </div>

      {realDealCount >= 1 && pokerHand.id !== 0 && <p>{pokerHand.name}</p>}
      {playerHand.length === 0 ? (
        <div className="player-hand">
          <Card variant="back" />
          <Card variant="back" />
          <Card variant="back" />
          <Card variant="back" />
          <Card variant="back" />
        </div>
      ) : (
        <PlayerHand />
      )}

      <dialog ref={dialogGameOver} className="dialog-game-over">
        <span>GAME OVER</span>
        <br />
        <span>Your new Total </span>
        <TotalCoins id={activePlayer.id} />
        <button type="button" onClick={resetGame} className="primary-button">
          Okay
        </button>
      </dialog>
    </section>
  );
}
