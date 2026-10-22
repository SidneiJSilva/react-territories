import { PeopleService } from "@/services";
import type { PeopleInterface } from "@/interfaces";
import { peopleStore } from "@/stores/peopleStore";
import { filtersStore } from "@/stores/filtersStore";
import { useFilters } from "../useFilters";

export const usePeople = () => {
	const { people, setPeople } = peopleStore();
	const { filterActive, filterOther } = filtersStore();
	const { applyPeoplePageFilter } = useFilters();

	const fetchPeople = async () => {
		try {
			const people = await PeopleService.fetchPeopleRasp();

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

	const updatePerson = async (personId: number, person: PeopleInterface) => {
		try {
			const personToUpdate = await PeopleService.updatePerson(personId, person);

			const peopleToUpdate = people.map((person: PeopleInterface) => {
				if (Number(person.peopleid) === Number(personId)) {
					person = {
						...personToUpdate,
						fullname: `${personToUpdate.firstname} ${personToUpdate.lastname}`,
					};
				}

				return person;
			});

			setPeople(peopleToUpdate);
			applyPeoplePageFilter(filterActive, filterOther, peopleToUpdate);
		} catch (error) {
			console.error("Failed to update person:", error);
			throw error;
		}
	};

	return { fetchPeople, updatePerson };
};
