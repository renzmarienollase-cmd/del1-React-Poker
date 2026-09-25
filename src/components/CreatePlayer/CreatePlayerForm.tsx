// This component allows users to create a new player.

import { useGlobalStore } from "../../Stores";
import "./CreatePlayerForm.css";

export default function CreatePlayerForm() {
  const addPlayer = useGlobalStore((store) => store.addPlayer);
  const playerCount = useGlobalStore((store) => store.playerCount);

  function handleSubmit(formData: FormData) {
    const newPlayer = {
      id: playerCount + 1,
      name: String(formData.get("player-name")),
      credits: 100,
    };

    addPlayer(newPlayer);
  }

  return (
    <form
      action={handleSubmit}
      className="add-player-form
    "
    >
      <label>
        <span>Player Name (max. 8 characters):</span>
        <span className="flex-row">
          <input
            id="player-name"
            name="player-name"
            type="text"
            maxLength={8}
            required
          />
          <button type="submit" className="primary-button">
            Create
          </button>
        </span>
      </label>
    </form>
  );
}
