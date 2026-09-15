import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Player = {
  id: number;
  name: string;
  credits: number;
};

// types for other objects should be put here for later use in Globals

export type Globals = {
  playerCount: number;
  players: Player[];
  addPlayer: (newPlayer: Player) => void;
  deletePlayer: (playerId: number) => void;
};

export const useGlobalStore = create<Globals>()(
  persist(
    (set) => ({
      playerCount: 0,
      players: [],
      addPlayer(newPlayer: Player) {
        set((state) => ({
          players: [...state.players, newPlayer],
          playerCount: state.playerCount + 1,
        }));
      },
      deletePlayer(playerId) {
        set((state) => ({
          players: state.players.filter((player) => player.id !== playerId),
          playerCount: state.playerCount - 1,
        }));
      },
    }),
    {
      name: "poker-storage",
    },
  ),
);
