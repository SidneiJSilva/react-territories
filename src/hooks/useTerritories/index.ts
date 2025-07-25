import { TerritoriesService } from "@/services";
import { territoriesStore } from "@/stores/territoriesStore";
import { type TerritoryInterface } from "@/interfaces";

export const useTerritories = () => {
	const { setTerritories, setGroupedTerritories } = territoriesStore() as {
		setTerritories: (territories: TerritoryInterface[]) => void;
		setGroupedTerritories: (
			groups: Record<string, TerritoryInterface[]>
		) => void;
	};

	const fetchTerritories = async () => {
		try {
			const territories = await TerritoriesService.fetchTerritories();

			setTerritories(territories);

			const groupedByArea = territories.reduce((acc, territory) => {
				const isComercial = territory.territorytype === "Comercial";
				const area = isComercial
					? "Comercial"
					: territory.territoryarea || "Sem área";

				if (!acc[area]) acc[area] = [];
				acc[area].push(territory);

				return acc;
			}, {} as Record<string, TerritoryInterface[]>);

			console.log("Grouped Territories:", groupedByArea);

			setGroupedTerritories(groupedByArea);
		} catch (error) {
			console.error("Failed to fetch territories:", error);
			throw error;
		}
	};

	return { fetchTerritories };
};
