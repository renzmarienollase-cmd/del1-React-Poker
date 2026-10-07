// This is the landing page for the actual game.

import { useParams } from "react-router";
import { getPlayerStore, type GameSessionStore } from "../../../Stores";
import Game from "../../Game/Game";
import TotalCoins from "../../TotalCoins/TotalCoins";
import "./GameVideoPoker.css";

export default function GameVideoPoker() {
  const { playerId } = useParams();
  const usePlayerStore = getPlayerStore(Number(playerId));
  const activePlayer = usePlayerStore(
    (store: GameSessionStore) => store.activePlayer,
  )!;

  return (
    <main className="game-page-container">
      <h1>Sky Poker</h1>
      <div className="player-profile">
        <h2>Player: {activePlayer.name}</h2>
        <TotalCoins id={activePlayer.id} />
      </div>
      <Game />
    </main>
  );
}
