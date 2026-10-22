import { create } from "zustand";
import { type PeopleInterface } from "@/interfaces";

interface PeopleStore {
	people: PeopleInterface[];
	peopleList: PeopleInterface[];

	setPeople: (people: PeopleInterface[]) => void;
	setPeopleList: (peopleList: PeopleInterface[]) => void;
}

export const peopleStore = create<PeopleStore>((set) => ({
	people: [],
	peopleList: [],

	setPeople: (people) => set({ people }),
	setPeopleList: (peopleList) => set({ peopleList }),
}));
