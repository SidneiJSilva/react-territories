import type { TerritoryInterface, TerritoryDetails } from "@/interfaces";
import SupabaseService from "@/services/supabase-service";

const TABLE_NAME = "territories_view";
export class TerritoriesService {
	static async fetchTerritories(): Promise<TerritoryInterface[]> {
		const { data, error } = await SupabaseService.from(TABLE_NAME)
			.select("*")
			.order("id");

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}

		return data as unknown as TerritoryInterface[];
	}

	static async fetchTerritoryDetails(id: number): Promise<TerritoryDetails> {
		console.log("Fetching territory details for ID:", id);

		const { data, error } = await SupabaseService.rpc("get_territory_by_id", {
			territory_id: id,
		});

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}

		console.log(data[0]);

		return data[0] as unknown as TerritoryDetails;
	}
}
