import Game from "../../Game/Game";
import "./GameVideoPoker.css";

export default function GameVideoPoker() {
  const activePlayer = JSON.parse(
    String(sessionStorage.getItem("activePlayer")),
  );

  return (
    <main>
      <h1>Video Poker</h1>
      <div className="player-profile">
        <h2>Player: {activePlayer.name}</h2>
        <h2>Credits: {activePlayer.credits}</h2>
      </div>

      <Game />
    </main>
  );
}
