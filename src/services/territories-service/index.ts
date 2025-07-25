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

	static async fetchTerritoryDetails(id: number): Promise<TerritoryInterface> {
		console.log("Fetching territory details for ID:", id);

		const { data, error } = await SupabaseService.from("territories")
			.select(
				`id, number, territory-area(label), territory-type(label), link, assignments(assigned-at, returned-at, people-id, territory-id, territories-people(id, first-name, last-name))`
			)
			.match({ id });

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}

		console.log(data[0]);

		return data[0] as unknown as TerritoryInterface;
	}
}
