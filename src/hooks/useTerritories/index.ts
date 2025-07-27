import { TerritoriesService } from "@/services";
import { territoriesStore } from "@/stores/territoriesStore";
import {
	type TerritoryInterface,
	type GroupedTerritoryArea,
} from "@/interfaces";
import { useDialogStore } from "@/stores/dialogStore";

type TerritoryStatus = TerritoryInterface["status"];

export const useTerritories = () => {
	const { setTerritories, setGroupedTerritories, setIsFetchingTerritories } =
		territoriesStore();

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
		territories: TerritoryInterface[]
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
						{} as Record<TerritoryStatus, number>
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
			{} as GroupedTerritoriesAccumulator
		);
	};

	const fetchTerritories = async (showLoading: boolean = true) => {
		if (showLoading) setIsFetchingTerritories(true);

		try {
			const territories = await TerritoriesService.fetchTerritories();

			setTerritories(territories);

			const groupedMap = groupTerritories(territories);

			const groupedByAreaWithStats = Object.values(
				groupedMap
			) as GroupedTerritoryArea[];

			setGroupedTerritories(groupedByAreaWithStats);
		} catch (error) {
			console.error("Failed to fetch territories:", error);
			throw error;
		} finally {
			if (showLoading) setIsFetchingTerritories(false);
		}
	};

	const openDialog = useDialogStore((state) => state.openDialog);

	const { setData } = useDialogStore();

	const fetchTerritoryDetails = async (id: number, update: boolean = false) => {
		try {
			const territory = await TerritoriesService.fetchTerritoryDetails(id);

			if (update) {
				setData(territory);
			} else {
				openDialog(territory);
			}
		} catch (error) {
			console.error("Failed to fetch territory details:", error);
			throw error;
		}
	};

	const assignTerritory = async (territoryId: number, peopleId: number) => {
		try {
			await TerritoriesService.assignTerritory(territoryId, peopleId);
			await territorySync(false, territoryId);
		} catch (error) {
			console.error("Failed to assign territory:", error);
			throw error;
		}
	};

	const returnTerritory = async (assignmentId: number, territoryId: number) => {
		try {
			await TerritoriesService.returnTerritory(assignmentId);
			await territorySync(false, territoryId);
		} catch (error) {
			console.error("Failed to return territory:", error);
			throw error;
		}
	};

	const territorySync = async (synced: boolean, territoryId: number) => {
		try {
			await TerritoriesService.territorySync(synced, territoryId);
			await fetchTerritoryDetails(territoryId, true);
			await fetchTerritories(false);
		} catch (error) {
			console.error("Failed to sync territory:", error);
			throw error;
		}
	};

	return {
		fetchTerritories,
		fetchTerritoryDetails,
		assignTerritory,
		returnTerritory,
		territorySync,
	};
};
