// stores/dialogStore.ts
import { create } from "zustand";
import type { TerritoryDetails } from "@/interfaces";

type DialogState = {
	open: boolean;
	data: TerritoryDetails | null;
	openDialog: (data: TerritoryDetails) => void;
	closeDialog: () => void;
};

export const useDialogStore = create<DialogState>((set) => ({
	open: false,
	data: null,
	openDialog: (data) => set({ open: true, data }),
	closeDialog: () => set({ open: false, data: null }),
}));
