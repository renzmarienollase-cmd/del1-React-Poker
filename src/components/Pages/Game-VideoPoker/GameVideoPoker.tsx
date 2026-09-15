import Game from "../../Game/Game";
export default function GameVideoPoker() {
  const activePlayer = JSON.parse(
    String(sessionStorage.getItem("activePlayer")),
  );

  return (
    <>
      <h1>Let's play Video Poker, {activePlayer.name}!</h1>
      <Game />
    </>
  );
}
