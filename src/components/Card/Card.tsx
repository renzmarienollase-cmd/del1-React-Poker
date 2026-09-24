import { useGlobalStore } from "../../Stores";
import "./Card.css";

type CardProps = {
  variant: "front" | "back";
  id?: number;
  suite?: string;
  value?: number;
  isHeld?: boolean;
};

export default function Card({ id, variant, suite, value, isHeld }: CardProps) {
  const pokerHand = useGlobalStore((store) => store.pokerHand);
  const setPokerHand = useGlobalStore((store) => store.setPokerHand);

  function toggleHeld() {
    const newPokerHand = pokerHand.map((handCard) =>
      handCard.card.id === id
        ? { ...handCard, isHeld: !handCard.isHeld }
        : handCard,
    );

    setPokerHand(newPokerHand);
  }

  return (
    <article className="hand-card">
      {!isHeld ? (
        <span className="status"></span>
      ) : (
        <span className="status">Held</span>
      )}
      {variant !== "front" ? (
        <div className={`deck-card ${variant}`}></div>
      ) : (
        <div className={`deck-card ${variant}`}>
          <h3>
            This is {value} of {suite}s
          </h3>
        </div>
      )}

      {variant !== "front" ? (
        <></>
      ) : (
        <button type="button" onClick={toggleHeld} id="hold-btn">
          {!isHeld ? <span>Hold</span> : <span>Release</span>}
        </button>
      )}
    </article>
  );
}
