import { territoriesStore } from "@/stores/territoriesStore";
import {
	type TerritoryInterface,
	type GroupedTerritoryArea,
} from "@/interfaces";
import { Filter } from "@/constants/filters";

type TerritoryStatus = TerritoryInterface["status"];

export const useFilters = () => {
	const { territories, setTerritoriesList } = territoriesStore();

	// GROUP TERRITORIES
	const STATUSES: TerritoryStatus[] = [
		"assigned",
		"resting",
		"delayed",
		"delayed_soon",
		"available",
	];

	interface GroupedTerritoriesAccumulator {
		[area: string]: GroupedTerritoryArea;
	}

	const groupTerritories = (
		territories: TerritoryInterface[],
	): GroupedTerritoriesAccumulator => {
		return territories.reduce<GroupedTerritoriesAccumulator>(
			(acc, territory) => {
				const isComercial: boolean = territory.territory_type === "Comercial";
				const area: string = isComercial
					? "Comercial"
					: territory.territory_area || "Sem área";

				if (!acc[area]) {
					const initialStats: Record<TerritoryStatus, number> = STATUSES.reduce(
						(stats, status) => ({ ...stats, [status]: 0 }),
						{} as Record<TerritoryStatus, number>,
					);

					acc[area] = {
						area,
						stats: initialStats,
						territories: [],
					};
				}

				acc[area].territories.push(territory);
				acc[area].stats[territory.status] += 1;

				return acc;
			},
			{} as GroupedTerritoriesAccumulator,
		);
	};

	const groupedByAreaWithStats = (territories: TerritoryInterface[]) => {
		const groupedMap = groupTerritories(territories);
		return Object.values(groupedMap) as GroupedTerritoryArea[];
	};

	// Apply status filter
	const applyStatusFilter = (
		status: string,
		territoriesUpdated?: TerritoryInterface[],
	) => {
		const territoriesSource = territoriesUpdated
			? territoriesUpdated
			: territories;
		let filteredTerritories: TerritoryInterface[] = territoriesSource;

		if (status) {
			switch (status) {
				case Filter.NOT_SYNCED:
					filteredTerritories = territoriesSource.filter(
						(t: TerritoryInterface) => !t.synced,
					);
					break;

				case Filter.COMMENT:
					filteredTerritories = territoriesSource.filter(
						(t: TerritoryInterface) => t.comment,
					);
					break;

				default:
					filteredTerritories = territoriesSource.filter(
						(t: TerritoryInterface) => t.status === status,
					);
			}
		}

		setTerritoriesList(filteredTerritories);
	};

	// Apply person filter
	const applyPeopleFilter = (
		personId: number,
		territoriesUpdated?: TerritoryInterface[],
	) => {
		const territoriesToFilter = territoriesUpdated
			? territoriesUpdated
			: territories;

		const filteredTerritories = personId
			? territoriesToFilter.filter(
					(territory) =>
						Number(territory.assignment_person_id) === personId &&
						territory.status !== "available" &&
						territory.status !== "resting",
				)
			: territoriesToFilter;

		setTerritoriesList(filteredTerritories);
	};

	return { groupedByAreaWithStats, applyStatusFilter, applyPeopleFilter };
};
