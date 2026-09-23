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
  const [winCondition, setWinCondition] = useState<WinCondition>({
    id: 0,
    name: "No win",
    payout: 0,
  });

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

    if (isARoyal === true && isAFlush === true) {
      const condition = winConditionsList.find((item) => item.id === 1);

      if (condition) {
        setWinCondition(condition);
      }
    } else if (isAStraight === true && isAFlush === true) {
      const condition = winConditionsList.find((item) => item.id === 2);

      if (condition) {
        setWinCondition(condition);
      }
    } else if (hasFourOfAKind === true) {
      const condition = winConditionsList.find((item) => item.id === 3);

      if (condition) {
        setWinCondition(condition);
      }
    } else if (hasThreeOfAKind === true && hasAPair === true) {
      const condition = winConditionsList.find((item) => item.id === 4);

      if (condition) {
        setWinCondition(condition);
      }
    } else if (isAFlush === true) {
      const condition = winConditionsList.find((item) => item.id === 5);

      if (condition) {
        setWinCondition(condition);
      }
    } else if (isAStraight === true) {
      const condition = winConditionsList.find((item) => item.id === 6);

      if (condition) {
        setWinCondition(condition);
      }
    } else if (hasThreeOfAKind === true) {
      const condition = winConditionsList.find((item) => item.id === 7);

      if (condition) {
        setWinCondition(condition);
      }
    } else if (hasTwoPairs === true) {
      const condition = winConditionsList.find((item) => item.id === 8);

      if (condition) {
        setWinCondition(condition);
      }
    } else if (hasJacksorBetter === true) {
      const condition = winConditionsList.find((item) => item.id === 9);

      if (condition) {
        setWinCondition(condition);
      }
    }
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

    if (realDealCount < 2) {
      realDealCount++;
    } else if (realDealCount === 2) {
      realDealCount = 0;
      setPokerHand([]);
    }

    if (winCondition && realDealCount === 2) {
      const newCredits = -currentBet;
      //const newCredits = winCondition.payout * currentBet - currentBet;
      // const newPokerHand: PokerHandCard[] = [];
      const resetCondition = {
        id: 0,
        name: "No win",
        payout: 0,
      };

      setPlayerCredits(activePlayer.id, newCredits);
      //setPokerHand(newPokerHand);
      setWinCondition(resetCondition);
    }
    setDealCount(realDealCount);
  }

  return (
    <Container as="section">
      <PayoutTable />
      <CurrentBet betValue={currentBet} onBetClick={handleClickBet} />
      <button type="button" onClick={handleClickDeal}>
        Deal
      </button>
      {winCondition ? <p>{winCondition.name}</p> : <p>no win</p>}
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
