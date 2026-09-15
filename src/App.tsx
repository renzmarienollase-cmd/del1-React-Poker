import CreatePlayerForm from "./components/CreatePlayer/CreatePlayerForm";
import { useGlobalStore } from "./Store";
import "./App.css";
import PlayButton from "./components/PlayButton/PlayButton";

export default function App() {
  const players = useGlobalStore((store) => store.players);
  const deletePlayer = useGlobalStore((store) => store.deletePlayer);

  function handleClickDelete(playerId: number) {
    deletePlayer(playerId);
  }

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
              <div>
                <PlayButton player={player} />
                <button
                  className="tertiary-button"
                  type="button"
                  onClick={() => handleClickDelete(player.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
