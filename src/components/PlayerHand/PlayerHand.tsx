// This component displays the five cards a player is dealt/draws.

import { useGameSessionStore } from "../../Stores";
import "./PlayerHand.css";
import Card from "../Card/Card";

export default function PlayerHand() {
  const playerHand = useGameSessionStore((store) => store.playerHand);
  return (
    <div className="player-hand">
      {playerHand.map((hand) => (
        <Card
          key={hand.card.id}
          id={hand.card.id}
          variant="front"
          suite={hand.card.suite}
          value={hand.card.value}
          isHeld={hand.isHeld}
        />
      ))}
    </div>
  );
}
