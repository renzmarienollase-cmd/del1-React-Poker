import CreatePlayerForm from "./components/CreatePlayer/CreatePlayerForm";
import { useGlobalStore } from "./Stores";
import "./App.css";
import PlayButton from "./components/PlayButton/PlayButton";

export default function App() {
  const players = useGlobalStore((store) => store.players);
  const deletePlayer = useGlobalStore((store) => store.deletePlayer);

  function handleClickDelete(playerId: number) {
    deletePlayer(playerId);
  }

  return (
    <main className="lobby-container">
      <h1>Welcome to Sky Poker</h1>
      <h2>Create a player</h2>
      <CreatePlayerForm />
      <h2>Players</h2>
      <ul>
        {players.length === 0 ? (
          <span>No players to display. Create a player!</span>
        ) : (
          players.map((player) => (
            <li key={player.id} className="player-bar flex-row bg-glass">
              <span>{player.name}</span>
              <div className="flex-row">
                <PlayButton id={player.id} />
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
    </main>
  );
}
