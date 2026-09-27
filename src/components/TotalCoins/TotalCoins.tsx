import { useGameSessionStore } from "../../Stores";

export default function TotalCoins() {
  const activePlayer = useGameSessionStore((store) => store.activePlayer)!;
  return;
  <span>Coins: {activePlayer.coins}</span>;
}
