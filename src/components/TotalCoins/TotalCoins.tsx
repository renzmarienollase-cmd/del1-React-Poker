import { useGameSessionStore } from "../../Stores";
import "./TotalCoins.css";

export default function TotalCoins() {
  const activePlayer = useGameSessionStore((store) => store.activePlayer)!;

  return <span className="total-coins">Coins: {activePlayer.coins}</span>;
}
