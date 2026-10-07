// This component saves the current player as active player in the session store and navigates to the game page.

import "./PlayButton.css";
import { NavLink } from "react-router";
import { useGlobalStore, type GameSessionStore } from "../../Stores";
import { getPlayerStore } from "../../Stores";

export default function PlayButton({ id }: { id: number }) {
  const players = useGlobalStore((store) => store.players);
  const usePlayerStore = getPlayerStore(Number(id));
  const setActivePlayer = usePlayerStore(
    (store: GameSessionStore) => store.setActivePlayer,
  );
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
