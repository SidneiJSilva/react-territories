import { TerritoriesService } from "@/services";
import { territoriesStore } from "@/stores/territoriesStore";
import { useDialogStore } from "@/stores/dialogStore";
import { useFilters } from "@/hooks";
import { filtersStore } from "@/stores/filtersStore";
import { type TerritoryStatusStats } from "@/stores/territoriesStore";
import type { TerritoryInterface } from "@/interfaces";

export const useTerritories = () => {
	const {
		setTerritories,
		setIsFetchingTerritories,
		setStatusCounts,
		setTerritoriesList,
		setIsLoading,
		setPersonTerritories,
	} = territoriesStore();

	const { applyStatusFilter, applyPeopleFilter } = useFilters();

	const { personId, status } = filtersStore();

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
			initialCounts,
		);
	};

	const fetchTerritories = async (showLoading: boolean = true) => {
		if (showLoading) setIsFetchingTerritories(true);

		try {
			const territories = await TerritoriesService.fetchTerritoriesRasp();

			await setStatusCounts(statusCounts(territories));
			await setTerritories(territories);
			updateTerritoriesList(territories);
		} catch (error) {
			console.error("Failed to fetch territories:", error);
			throw error;
		} finally {
			if (showLoading) setIsFetchingTerritories(false);
		}
	};

	const updateTerritoriesList = (territories: TerritoryInterface[]) => {
		if (personId) {
			applyPeopleFilter(Number(personId) || 0, territories);
		} else if (status) {
			applyStatusFilter(status, territories);
		} else {
			setTerritoriesList(territories);
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

	const deleteAssignment = async (
		assignmentId: number,
		territoryId: number,
	) => {
		setIsLoading(true);

		try {
			await TerritoriesService.deleteAssignmentRasp(assignmentId);
			await fetchTerritories(false);
			await fetchTerritoryDetails(territoryId, true);
		} catch (error) {
			console.error("Failed to delete assignment:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const assignTerritory = async (
		territoryId: number,
		peopleId: number,
		date: string,
	) => {
		setIsLoading(true);

		try {
			await TerritoriesService.assignTerritoryRasp(territoryId, peopleId, date);
			await fetchTerritories(false);
			await fetchTerritoryDetails(territoryId, true);
		} catch (error) {
			console.error("Failed to assign territory:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const returnTerritory = async (
		assignmentId: number,
		territoryId: number,
		date: string,
	) => {
		setIsLoading(true);

		try {
			await TerritoriesService.returnTerritoryRasp(assignmentId, date);
			await fetchTerritories(false);
			await fetchTerritoryDetails(territoryId, true);
		} catch (error) {
			console.error("Failed to return territory:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const territorySync = async (synced: boolean, territoryId: number) => {
		setIsLoading(true);

		try {
			await TerritoriesService.territorySyncRasp(synced, territoryId);
			await fetchTerritoryDetails(territoryId, true);
			await fetchTerritories(false);
		} catch (error) {
			console.error("Failed to sync territory:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const updateTerritoryComment = async (
		territoryId: number,
		comment: string | null,
	) => {
		setIsLoading(true);

		try {
			await TerritoriesService.updateTerritoryComment(territoryId, comment);
			await fetchTerritoryDetails(territoryId, true);
			await fetchTerritories(false);
		} catch (error) {
			console.error("Failed to update territory comment:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const fetchPersonTerritories = async (peopleId: number) => {
		setIsLoading(true);

		try {
			const personTerritories =
				await TerritoriesService.fetchPersonTerritoriesRasp(peopleId);
			setPersonTerritories(personTerritories);
		} catch (error) {
			console.error("Failed to fetch person's territories:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		fetchTerritories,
		fetchTerritoryDetails,
		assignTerritory,
		returnTerritory,
		territorySync,
		deleteAssignment,
		updateTerritoryComment,
		fetchPersonTerritories,
	};
};
