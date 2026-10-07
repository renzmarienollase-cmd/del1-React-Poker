// A card component that renders a playing card in a hand.

import {
  useGlobalStore,
  type GameSessionStore,
  getPlayerStore,
  type PlayerHandCard,
} from "../../Stores";
import "./Card.css";
import { useParams } from "react-router";

type CardProps = {
  variant: "front" | "back";
  id?: number;
  suite?: string;
  value?: number;
  isHeld?: boolean;
};

export default function Card({ id, variant, suite, value, isHeld }: CardProps) {
  const darkTheme = useGlobalStore((store) => store.darkTheme);
  const { playerId } = useParams();
  const usePlayerStore = getPlayerStore(Number(playerId));
  const playerHand = usePlayerStore(
    (store: GameSessionStore) => store.playerHand,
  );
  const setPlayerHand = usePlayerStore(
    (store: GameSessionStore) => store.setPlayerHand,
  );

  let cardName = "";

  if (value === 13) {
    cardName = "K";
  } else if (value === 12) {
    cardName = "Q";
  } else if (value === 11) {
    cardName = "J";
  } else if (value === 1) {
    cardName = "A";
  } else {
    cardName = `${value}`;
  }

  let cardImage = "";
  if (darkTheme && suite === "diamond") {
    cardImage = "Diamond_Dark.svg";
  } else if (darkTheme && suite === "heart") {
    cardImage = "Heart_Dark.svg";
  } else if (darkTheme && suite === "spade") {
    cardImage = "Spade_Dark.svg";
  } else if (darkTheme && suite === "club") {
    cardImage = "Club_Dark.svg";
  } else if (!darkTheme && suite === "diamond") {
    cardImage = "Diamond_Light.svg";
  } else if (!darkTheme && suite === "heart") {
    cardImage = "Heart_Light.svg";
  } else if (!darkTheme && suite === "spade") {
    cardImage = "Spade_Light.svg";
  } else if (!darkTheme && suite === "club") {
    cardImage = "Club_Light.svg";
  }

  function toggleHeld() {
    const newPlayerHand = playerHand.map((handCard: PlayerHandCard) =>
      handCard.card.id === id
        ? { ...handCard, isHeld: !handCard.isHeld }
        : handCard,
    );

    setPlayerHand(newPlayerHand);
  }

  return (
    <article className={`hand-card ${isHeld ? "bg-held" : ""}`}>
      {!isHeld ? (
        <span className="status"></span>
      ) : (
        <span className="status">Held</span>
      )}

      {variant !== "front" ? (
        <div className={`deck-card ${variant} bg-glass`}>
          {!darkTheme ? (
            <img src="/Sun.svg" alt="" />
          ) : (
            <img src="/Moon.svg" alt="" />
          )}
        </div>
      ) : (
        <div className={`deck-card ${variant}`}>
          <span className="card-value">{cardName}</span>
          <img src={`/${cardImage}`} alt={`${suite}s suite icon`} />
        </div>
      )}

      {variant !== "front" ? (
        <></>
      ) : (
        <button type="button" onClick={toggleHeld} className="secondary-button">
          {!isHeld ? <span>Hold</span> : <span>Release</span>}
        </button>
      )}
    </article>
  );
}
