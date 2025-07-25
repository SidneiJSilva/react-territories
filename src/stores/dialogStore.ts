// stores/dialogStore.ts
import { create } from "zustand";
import type { TerritoryInterface } from "@/interfaces";

type DialogState = {
	open: boolean;
	data: TerritoryInterface | null;
	openDialog: (data: TerritoryInterface) => void;
	closeDialog: () => void;
};

export const useDialogStore = create<DialogState>((set) => ({
	open: false,
	data: null,
	openDialog: (data) => set({ open: true, data }),
	closeDialog: () => set({ open: false, data: null }),
}));
