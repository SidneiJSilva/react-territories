import { type TerritoryInterface } from "@/interfaces";
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
}
