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

export type DeckCard = {
  id: number;
  suite: string;
  value: number;
};

export type PlayerHand = {
  playerHand: DeckCard[];
};

// types for other objects should be put here for later use in Globals

export type Globals = {
  playerCount: number;
  players: Player[];
  addPlayer: (newPlayer: Player) => void;

  winCombination: WinCombination[];
  deckCards: DeckCard[];
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
      deckCards: [
        { id: 1, suite: "spade", value: 1 },
        { id: 2, suite: "spade", value: 2 },
        { id: 3, suite: "spade", value: 3 },
        { id: 4, suite: "spade", value: 4 },
        { id: 5, suite: "spade", value: 5 },
        { id: 6, suite: "spade", value: 6 },
        { id: 7, suite: "spade", value: 7 },
        { id: 8, suite: "spade", value: 8 },
        { id: 9, suite: "spade", value: 9 },
        { id: 10, suite: "spade", value: 10 },
        { id: 11, suite: "spade", value: 11 },
        { id: 12, suite: "spade", value: 12 },
        { id: 13, suite: "spade", value: 13 },

        { id: 14, suite: "heart", value: 1 },
        { id: 15, suite: "heart", value: 2 },
        { id: 16, suite: "heart", value: 3 },
        { id: 17, suite: "heart", value: 4 },
        { id: 18, suite: "heart", value: 5 },
        { id: 19, suite: "heart", value: 6 },
        { id: 20, suite: "heart", value: 7 },
        { id: 21, suite: "heart", value: 8 },
        { id: 22, suite: "heart", value: 9 },
        { id: 23, suite: "heart", value: 10 },
        { id: 24, suite: "heart", value: 11 },
        { id: 25, suite: "heart", value: 12 },
        { id: 26, suite: "heart", value: 13 },

        { id: 27, suite: "diamond", value: 1 },
        { id: 28, suite: "diamond", value: 2 },
        { id: 29, suite: "diamond", value: 3 },
        { id: 30, suite: "diamond", value: 4 },
        { id: 31, suite: "diamond", value: 5 },
        { id: 32, suite: "diamond", value: 6 },
        { id: 33, suite: "diamond", value: 7 },
        { id: 34, suite: "diamond", value: 8 },
        { id: 35, suite: "diamond", value: 9 },
        { id: 36, suite: "diamond", value: 10 },
        { id: 37, suite: "diamond", value: 11 },
        { id: 38, suite: "diamond", value: 12 },
        { id: 39, suite: "diamond", value: 13 },

        { id: 40, suite: "club", value: 1 },
        { id: 41, suite: "club", value: 2 },
        { id: 42, suite: "club", value: 3 },
        { id: 43, suite: "club", value: 4 },
        { id: 44, suite: "club", value: 5 },
        { id: 45, suite: "club", value: 6 },
        { id: 46, suite: "club", value: 7 },
        { id: 47, suite: "club", value: 8 },
        { id: 48, suite: "club", value: 9 },
        { id: 49, suite: "club", value: 10 },
        { id: 50, suite: "club", value: 11 },
        { id: 51, suite: "club", value: 12 },
        { id: 52, suite: "club", value: 13 },
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
