import { useGameSessionStore } from "../../Stores";
import "./PokerHandDisplay.css";

export default function PokerHandDisplay() {
  const pokerHand = useGameSessionStore((store) => store.pokerHand);
  return (
    <div>
      {pokerHand.id !== 0 && (
        <span className="poker-hand-display">{pokerHand.name}</span>
      )}
    </div>
  );
}
