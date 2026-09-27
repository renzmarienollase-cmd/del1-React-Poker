import { useGlobalStore } from "../../Stores";
import "./TotalCoins.css";

export default function TotalCoins({ id }: { id: number }) {
  const players = useGlobalStore((store) => store.players);
  const activePlayer = players.find((player) => player.id === id)!;

  return <span className="total-coins">Coins: {activePlayer.coins}</span>;
}
