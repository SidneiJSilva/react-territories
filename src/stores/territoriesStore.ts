import { create } from "zustand";
import { type TerritoryInterface } from "@/interfaces";

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
	territoriesList: TerritoryInterface[];
	groupedTerritories: GroupedTerritoryArea[];
	isFetchingTerritories: boolean;
	statusCounts: TerritoryStatusStats;
	isLoading: boolean;

	setTerritories: (territories: TerritoryInterface[]) => void;
	setTerritoriesList: (territories: TerritoryInterface[]) => void;
	setGroupedTerritories: (groups: GroupedTerritoryArea[]) => void;
	setIsFetchingTerritories: (isFetching: boolean) => void;
	setStatusCounts: (counts: TerritoryStatusStats) => void;
	setIsLoading: (isLoading: boolean) => void;
}

export const territoriesStore = create<TerritoriesStore>((set) => ({
	territories: [],
	territoriesList: [],
	groupedTerritories: [],
	isFetchingTerritories: false,
	statusCounts: {
		assigned: 0,
		resting: 0,
		delayed: 0,
		delayed_soon: 0,
		available: 0,
	},
	isLoading: false,

	setTerritories: (territories) => set({ territories }),
	setTerritoriesList: (territoriesList) => set({ territoriesList }),
	setGroupedTerritories: (groups) => set({ groupedTerritories: groups }),
	setStatusCounts: (statusCounts) => set({ statusCounts }),
	setIsFetchingTerritories: (isFetching: boolean) =>
		set({ isFetchingTerritories: isFetching }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
