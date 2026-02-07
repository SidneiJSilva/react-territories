import { territoriesStore } from "@/stores/territoriesStore";
import {
	type TerritoryInterface,
	type GroupedTerritoryArea,
} from "@/interfaces";

type TerritoryStatus = TerritoryInterface["status"];

export const useFilters = () => {
	const { territories, setGroupedTerritories, setTerritoriesList } =
		territoriesStore();

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
				const isComercial: boolean = territory.territorytype === "Comercial";
				const area: string = isComercial
					? "Comercial"
					: territory.territoryarea || "Sem área";

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
	const applyStatusFilter = (status: string) => {
		const filteredTerritories = status
			? status === "no_synced"
				? territories.filter((territory) => !territory.synced)
				: territories.filter((territory) => territory.status === status)
			: territories;

		setTerritoriesList(filteredTerritories);
		setGroupedTerritories(groupedByAreaWithStats(filteredTerritories));
	};

	// Apply person filter
	const applyPeopleFilter = (personId: number) => {
		const filteredTerritories = personId
			? territories.filter(
					(territory) =>
						territory.peopleid === personId &&
						territory.status !== "available" &&
						territory.status !== "resting",
				)
			: territories;

		setTerritoriesList(filteredTerritories);
		setGroupedTerritories(groupedByAreaWithStats(filteredTerritories));
	};

	return { groupedByAreaWithStats, applyStatusFilter, applyPeopleFilter };
};
