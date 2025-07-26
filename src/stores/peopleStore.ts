import { create } from "zustand";
import { type PeopleInterface } from "@/interfaces";

interface PeopleStore {
	people: PeopleInterface[];

	setPeople: (people: PeopleInterface[]) => void;
}

export const peopleStore = create<PeopleStore>((set) => ({
	people: [],

	setPeople: (people) => set({ people }),
}));
