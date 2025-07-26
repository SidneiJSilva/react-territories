import { PeopleService } from "@/services";
import type { PeopleInterface } from "@/interfaces";
import { peopleStore } from "@/stores/peopleStore";

export const usePeople = () => {
	const { setPeople } = peopleStore();

	const fetchPeople = async () => {
		try {
			const people = await PeopleService.fetchPeople();

			const fullNamePeople = people.map((person: PeopleInterface) => ({
				...person,
				fullname: `${person.firstname} ${person.lastname}`,
			}));

			setPeople(fullNamePeople);
		} catch (error) {
			console.error("Failed to fetch people:", error);
			throw error;
		}
	};

	return { fetchPeople };
};
