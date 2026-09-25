import { useGlobalStore } from "../../../Stores";
import Game from "../../Game/Game";
import "./GameVideoPoker.css";

export default function GameVideoPoker() {
  const sessionId = sessionStorage.getItem("activePlayer");

  const id = Number(sessionId);

  const players = useGlobalStore((store) => store.players);

  const activePlayer = players.find((player) => player.id === id)!;
  return (
    <main className="game-page-container">
      <h1>Sky Poker</h1>
      <div className="player-profile">
        <h2>Player: {activePlayer.name}</h2>
        <h2>Credits: {activePlayer.credits}</h2>
      </div>
      <Game />
    </main>
  );
}
