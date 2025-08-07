import { create } from "zustand";

interface NavigationStore {
	actualPage: string;

	setActualPage: (actualPage: string) => void;
}

export const navigationStore = create<NavigationStore>((set) => ({
	actualPage: "list",

	setActualPage: (newPage) => set({ actualPage: newPage }),
}));
