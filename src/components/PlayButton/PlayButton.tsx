import "./PlayButton.css";
import { useNavigate } from "react-router";

export default function PlayButton({ id }: { id: number }) {
  let navigate = useNavigate();

  function handleClick() {
    const activePlayer = JSON.stringify(id);

    sessionStorage.setItem("activePlayer", activePlayer);

    navigate("/game-videopoker");
  }

  return (
    <button className="secondary-button" onClick={handleClick}>
      Play
    </button>
  );
}
