import CreatePlayerForm from "./components/CreatePlayer/CreatePlayerForm";
import { useGlobalStore } from "./Store";
import "./App.css";
import { NavLink } from "react-router";

export default function App() {
  const players = useGlobalStore((store) => store.players);
  console.log("inside App. players are", players);

  return (
    <section className="lobby-container">
      <h1>Welcome!</h1>
      <h2>Create a player</h2>
      <CreatePlayerForm />
      <span> OR </span>
      <h2>Choose a player</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <span>{player.name}</span>
            <NavLink to="/game-videopoker">Play</NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
