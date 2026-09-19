import { useGlobalStore } from "../../Store";
import "./PokerHand.css";
import Card from "../Card/Card";

export default function PokerHand() {
  const pokerHand = useGlobalStore((store) => store.pokerHand);
  return (
    <div className="poker-hand">
      {pokerHand.map((hand) => (
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
