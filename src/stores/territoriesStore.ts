// src/stores/territoriesStore.ts
import { create } from "zustand";
import { type TerritoryInterface } from "@/interfaces";

export const territoriesStore = create((set) => ({
	territories: [] as TerritoryInterface[],

	setTerritories: (territories: TerritoryInterface[]) => set({ territories }),
}));
