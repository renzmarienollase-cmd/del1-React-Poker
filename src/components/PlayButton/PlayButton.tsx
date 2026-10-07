// This component saves the current player as active player in the session store and navigates to the game page.

import "./PlayButton.css";
import { NavLink } from "react-router";
import { useGlobalStore } from "../../Stores";
import { useGameSessionStore } from "../../Stores";

export default function PlayButton({ id }: { id: number }) {
  const players = useGlobalStore((store) => store.players);
  const setActivePlayer = useGameSessionStore((store) => store.setActivePlayer);
  const sessionPlayer = players.find((player) => player.id === id)!;

  return (
    <NavLink
      className="secondary-button"
      to={`/game-videopoker/${id}`}
      onClick={() => setActivePlayer(sessionPlayer)}
    >
      Play
    </NavLink>
  );
}
