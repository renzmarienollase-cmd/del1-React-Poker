import { useGlobalStore } from "../../Store";
import "./PokerHand.css";
import Card from "../Card/Card";

export default function PokerHand() {
  const pokerHand = useGlobalStore((store) => store.pokerHand);
  return (
    <>
      {pokerHand.length === 0 ? (
        <div className="poker-hand">
          <Card variant="back" />
          <Card variant="back" />
          <Card variant="back" />
          <Card variant="back" />
          <Card variant="back" />
        </div>
      ) : (
        pokerHand.map((hand) => (
          <div key={hand.card.id} className="hand-card">
            <Card
              variant="front"
              suite={hand.card.suite}
              value={hand.card.value}
              isHeld={hand.isHeld}
            />
            <button type="button">Hold</button>
          </div>
        ))
      )}
    </>
  );
}
