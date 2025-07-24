import { TerritoriesService } from "@/services";
import { territoriesStore } from "@/stores/territoriesStore";
import { type TerritoryInterface } from "@/interfaces";

export const useTerritories = () => {
	const { setTerritories } = territoriesStore() as {
		setTerritories: (territories: TerritoryInterface[]) => void;
	};

	const fetchTerritories = async () => {
		try {
			const territories = await TerritoriesService.fetchTerritories();

			setTerritories(territories);
		} catch (error) {
			console.error("Failed to fetch territories:", error);
			throw error;
		}
	};

	return { fetchTerritories };
};
