import { TerritoriesService } from "@/services";
import { territoriesStore } from "@/stores/territoriesStore";
import { useDialogStore } from "@/stores/dialogStore";
import { useFilters } from "@/hooks";
import { filtersStore } from "@/stores/filtersStore";

export const useTerritories = () => {
	const { setTerritories, setGroupedTerritories, setIsFetchingTerritories } =
		territoriesStore();

	const { groupedByAreaWithStats } = useFilters();

	const fetchTerritories = async (showLoading: boolean = true) => {
		if (showLoading) setIsFetchingTerritories(true);

		try {
			const territories = await TerritoriesService.fetchTerritories();

			setTerritories(territories);

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
