import { TerritoriesService } from "@/services";
import { territoriesStore } from "@/stores/territoriesStore";
import { useDialogStore } from "@/stores/dialogStore";
import { useFilters } from "@/hooks";
import { filtersStore } from "@/stores/filtersStore";
import { type TerritoryStatusStats } from "@/stores/territoriesStore";

export const useTerritories = () => {
	const {
		setTerritories,
		setGroupedTerritories,
		setIsFetchingTerritories,
		setStatusCounts,
		setTerritoriesList,
	} = territoriesStore();

	const { groupedByAreaWithStats } = useFilters();

	interface Territory {
		id: number;
		status: string;
	}

	const statusCounts = (territories: Territory[]): TerritoryStatusStats => {
		const initialCounts: TerritoryStatusStats = {
			assigned: 0,
			resting: 0,
			delayed: 0,
			delayed_soon: 0,
			available: 0,
		};

		return territories.reduce(
			(counts: TerritoryStatusStats, territory: Territory) => {
				if (counts.hasOwnProperty(territory.status)) {
					counts[territory.status as keyof TerritoryStatusStats] += 1;
				}
				return counts;
			},
			initialCounts
		);
	};

	const fetchTerritories = async (showLoading: boolean = true) => {
		if (showLoading) setIsFetchingTerritories(true);

		try {
			const territories = await TerritoriesService.fetchTerritories();

			setStatusCounts(statusCounts(territories));
			setTerritories(territories);
			setTerritoriesList(territories);
			setGroupedTerritories(groupedByAreaWithStats(territories));
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
			resetFilters();
		} catch (error) {
			console.error("Failed to sync territory:", error);
			throw error;
		}
	};

	const { setPersonId, setStatus } = filtersStore();

	const resetFilters = () => {
		setPersonId("");
		setStatus("");
	};

	return {
		fetchTerritories,
		fetchTerritoryDetails,
		assignTerritory,
		returnTerritory,
		territorySync,
	};
};
