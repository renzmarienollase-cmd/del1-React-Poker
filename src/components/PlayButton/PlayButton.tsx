// This component saves the current player as active player in the session store and navigates to the game page.

import { useGameSessionStore, useGlobalStore } from "../../Stores";
import "./PlayButton.css";
import { useNavigate } from "react-router";

export default function PlayButton({ id }: { id: number }) {
  const players = useGlobalStore((store) => store.players);
  const setActivePlayer = useGameSessionStore((store) => store.setActivePlayer);
  const navigate = useNavigate();

  function handleClick() {
    const activePlayer = players.find((player) => player.id === id)!;

    setActivePlayer(activePlayer);

    navigate("/game-videopoker");
  }

  return (
    <button className="secondary-button" onClick={handleClick}>
      Play
    </button>
  );
}
