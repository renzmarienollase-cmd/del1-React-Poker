import "./PokerHandDisplay.css";
import { type PokerHand } from "../../Stores";

export default function PokerHandDisplay({
  pokerHand,
}: {
  pokerHand: PokerHand;
}) {
  return (
    <div>
      {pokerHand.id !== 0 && (
        <span className="poker-hand-display">{pokerHand.name}</span>
      )}
    </div>
  );
}
