import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Player = {
  id: number;
  name: string;
  credits: number;
};

export type WinCombination = {
  id: number;
  name: string;
  payout: number;
};

// types for other objects should be put here for later use in Globals

export type Globals = {
  playerCount: number;
  players: Player[];
  addPlayer: (newPlayer: Player) => void;

  winCombination: WinCombination[];
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
      winCombination: [
        { id: 1, name: "Royal Flush", payout: 250 },
        { id: 2, name: "Straight Flush", payout: 50 },
        { id: 3, name: "Four of a Kind", payout: 25 },
        { id: 4, name: "Full House", payout: 9 },
        { id: 5, name: "Flush", payout: 6 },
        { id: 6, name: "Straight", payout: 4 },
        { id: 7, name: "Three of a kind", payout: 3 },
        { id: 8, name: "Two Pair", payout: 2 },
        { id: 9, name: "Jacks or Better", payout: 1 },
      ],
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
