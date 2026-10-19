// stores/dialogStore.ts
import { create } from "zustand";
import type { TerritoryDetails, PeopleInterface } from "@/interfaces";

interface DialogStoreActions {
	openDialog: (data: TerritoryDetails) => void;
	closeDialog: () => void;
	setData: (data: TerritoryDetails | null) => void;

	openPersonDialog: (dataPerson: PeopleInterface) => void;
	closePersonDialog: () => void;
	setPersonData: (dataPerson: PeopleInterface | null) => void;
}

interface DialogStoreState {
	open: boolean;
	data: TerritoryDetails | null;

	openPerson: boolean;
	dataPerson: PeopleInterface | null;
}

export const useDialogStore = create<DialogStoreState & DialogStoreActions>(
	(set) => ({
		open: false,
		data: null,
		openDialog: (data: TerritoryDetails) => set({ open: true, data }),
		closeDialog: () => set({ open: false, data: null }),
		setData: (data: TerritoryDetails | null) => set({ data }),

		openPerson: false,
		dataPerson: null,
		openPersonDialog: (dataPerson: PeopleInterface) => {
			set({ dataPerson });
			set({ openPerson: true });
		},
		closePersonDialog: () => set({ openPerson: false, dataPerson: null }),
		setPersonData: (dataPerson: PeopleInterface | null) => set({ dataPerson }),
	}),
);
