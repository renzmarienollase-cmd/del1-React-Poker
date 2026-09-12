import { create } from "zustand";

export type Player = {
  id: number;
  name: string;
  credits: number;
};

// types for other objects should be put here for later use in Globals

export type Globals = {
  players: Player[];
  addPlayer: (newPlayer: Player) => void;
};

export const useGlobalStore = create<Globals>((set) => ({
  players: [
    {
      id: 1,
      name: "Sample Player",
      credits: 100,
    },
  ],
  addPlayer(newPlayer) {
    set((state) => ({
      players: [...state.players, newPlayer],
    }));
  },
}));
