import "./PlayButton.css";
import { useNavigate } from "react-router";
import type { Player } from "../../Stores";

export default function PlayButton({ player }: { player: Player }) {
  let navigate = useNavigate();

  function handleClick() {
    const activePlayer = JSON.stringify(player);

    sessionStorage.setItem("activePlayer", activePlayer);

    navigate("/game-videopoker");
  }

  return (
    <button className="primary-button" onClick={handleClick}>
      Play
    </button>
  );
}
