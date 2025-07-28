import { create } from "zustand";

interface FiltersStore {
	personId: string;
	status: string;

	setPersonId: (personId: string) => void;
	setStatus: (status: string) => void;
}

export const filtersStore = create<FiltersStore>((set) => ({
	personId: "",
	status: "",

	setPersonId: (personId) => set({ personId }),
	setStatus: (status) => set({ status }),
}));
