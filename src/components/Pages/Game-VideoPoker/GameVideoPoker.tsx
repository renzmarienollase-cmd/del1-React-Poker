// This is the landing page for the actual game.

import { useGameSessionStore } from "../../../Stores";
import Game from "../../Game/Game";
import "./GameVideoPoker.css";

export default function GameVideoPoker() {
  const activePlayer = useGameSessionStore((store) => store.activePlayer)!;

  return (
    <main className="game-page-container">
      <h1>Sky Poker</h1>
      <div className="player-profile">
        <h2>Player: {activePlayer.name}</h2>
        <h2></h2>
      </div>
      <Game />
    </main>
  );
}
