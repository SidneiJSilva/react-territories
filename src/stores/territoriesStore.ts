import { create } from "zustand";
import { type TerritoryInterface } from "@/interfaces";

interface TerritoriesStore {
	territories: TerritoryInterface[];
	groupedTerritories: Record<string, TerritoryInterface[]>;

	setTerritories: (territories: TerritoryInterface[]) => void;
	setGroupedTerritories: (groups: Record<string, TerritoryInterface[]>) => void;
}

export const territoriesStore = create<TerritoriesStore>((set) => ({
	territories: [],
	groupedTerritories: {},

	setTerritories: (territories) => set({ territories }),
	setGroupedTerritories: (groups) => set({ groupedTerritories: groups }),
}));
