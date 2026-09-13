import { create } from "zustand";

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
};

export const useGlobalStore = create<Globals>((set) => ({
  playerCount: 1,
  players: [
    {
      id: 1,
      name: "Sample Player",
      credits: 100,
    },
  ],
  addPlayer(newPlayer: Player) {
    set((state) => ({
      players: [...state.players, newPlayer],
      playerCount: state.playerCount + 1,
    }));
  },
}));
