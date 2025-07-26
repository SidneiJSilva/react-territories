import { create } from "zustand";
import { type TerritoryInterface } from "@/interfaces";

// Define os status válidos para contagem
export type TerritoryStatus = TerritoryInterface["status"];

export type TerritoryStatusStats = {
	[K in TerritoryStatus]: number;
};

export interface GroupedTerritoryArea {
	area: string;
	stats: TerritoryStatusStats;
	territories: TerritoryInterface[];
}

interface TerritoriesStore {
	territories: TerritoryInterface[];
	groupedTerritories: GroupedTerritoryArea[];
	isFetchingTerritories: boolean;

	setTerritories: (territories: TerritoryInterface[]) => void;
	setGroupedTerritories: (groups: GroupedTerritoryArea[]) => void;
	setIsFetchingTerritories: (isFetching: boolean) => void;
}

export const territoriesStore = create<TerritoriesStore>((set) => ({
	territories: [],
	groupedTerritories: [],
	isFetchingTerritories: false,

	setTerritories: (territories) => set({ territories }),
	setGroupedTerritories: (groups) => set({ groupedTerritories: groups }),
	setIsFetchingTerritories: (isFetching: boolean) =>
		set({ isFetchingTerritories: isFetching }),
}));
