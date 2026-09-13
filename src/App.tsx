import CreatePlayerForm from "./components/CreatePlayer/CreatePlayerForm";
import { useGlobalStore } from "./Store";
import "./App.css";
import { useNavigate } from "react-router";

export default function App() {
  const players = useGlobalStore((store) => store.players);

  let navigate = useNavigate();

  return (
    <section className="lobby-container">
      <h1>Welcome!</h1>
      <h2>Create a player</h2>
      <CreatePlayerForm />
      <span> OR </span>
      <h2>Choose a player</h2>
      <ul>
        {players.length === 0 ? (
          <span>No players to display. Create a player!</span>
        ) : (
          players.map((player) => (
            <li key={player.id}>
              <span>{player.name}</span>
              <button onClick={() => navigate("/game-videopoker")}>Play</button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
