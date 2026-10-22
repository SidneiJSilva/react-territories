import { create } from "zustand";

interface FiltersStore {
	personId: string;
	status: string;
	filterActive: string;
	filterOther: string[];

	setPersonId: (personId: string) => void;
	setStatus: (status: string) => void;
	setFilterActive: (filterActive: string) => void;
	setFilterOther: (filterOther: string[]) => void;
}

export const filtersStore = create<FiltersStore>((set) => ({
	personId: "",
	status: "",
	filterActive: "active",
	filterOther: ["all"],

	setPersonId: (personId) => set({ personId }),
	setStatus: (status) => set({ status }),
	setFilterActive: (filterActive) => set({ filterActive }),
	setFilterOther: (filterOther) => set({ filterOther }),
}));
