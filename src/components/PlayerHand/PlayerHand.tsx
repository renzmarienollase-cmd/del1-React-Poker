// This component displays the five cards a player is dealt/draws.

import "./PlayerHand.css";
import Card from "../Card/Card";
import type { PlayerHandCard } from "../../Stores";

export default function PlayerHand({
  playerHand,
}: {
  playerHand: PlayerHandCard[];
}) {
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
