// stores/dialogStore.ts
import { create } from "zustand";
import type { TerritoryDetails } from "@/interfaces";

interface DialogStoreActions {
	openDialog: (data: TerritoryDetails) => void;
	closeDialog: () => void;
	setData: (data: TerritoryDetails | null) => void;
}

interface DialogStoreState {
	open: boolean;
	data: TerritoryDetails | null;
}

export const useDialogStore = create<DialogStoreState & DialogStoreActions>(
	(set) => ({
		open: false,
		data: null,
		openDialog: (data: TerritoryDetails) => set({ open: true, data }),
		closeDialog: () => set({ open: false, data: null }),
		setData: (data: TerritoryDetails | null) => set({ data }),
	})
);
