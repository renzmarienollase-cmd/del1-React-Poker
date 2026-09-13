// This component allows users to create a new player.

import { useGlobalStore } from "../../Store";
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
    <form action={handleSubmit}>
      <label>
        Player Name (max. 8 characters):
        <input
          id="player-name"
          name="player-name"
          type="text"
          maxLength={8}
          required
        />
        <button type="submit">Create</button>
      </label>
    </form>
  );
}
