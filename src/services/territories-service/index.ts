import { type TerritoryInterface } from "@/interfaces";
import SupabaseService from "@/services/supabase-service";

export class TerritoriesService {
	static async fetchTerritories(): Promise<TerritoryInterface[]> {
		const { data, error } = await SupabaseService.from("territories").select(
			`
        id,
        number,
        territory-area(label),
        territory-type(label),
        link,
        assignments(
          assigned-at,
          returned-at,
          people-id,
          territory-id,
          territories-people(id, first-name, last-name)
        ),
        synced,
        boundaries
			`
		);

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}

		// forçando o tipo manualmente
		return data as unknown as TerritoryInterface[];
	}
}
