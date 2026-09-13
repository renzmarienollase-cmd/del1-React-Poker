import Game from "../../Game/Game";
import PayoutTable from "../../PayoutTable/PayoutTable";
export default function GameVideoPoker() {
  const activePlayer = JSON.parse(
    String(sessionStorage.getItem("activePlayer")),
  );

  return (
    <>
      <h1>Let's play Video Poker, {activePlayer.name}!</h1>
      <PayoutTable />
      <Game />
    </>
  );
}
