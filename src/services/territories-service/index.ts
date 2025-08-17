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
		const { data, error } = await SupabaseService.rpc("get_territory_by_id", {
			territory_id: id,
		});

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}

		return data[0] as unknown as TerritoryDetails;
	}

	static async assignTerritory(
		territoryId: number,
		peopleId: number,
		date: string
	) {
		const { error } = await SupabaseService.from("assignments").insert({
			"territory-id": territoryId,
			"people-id": peopleId,
			"assigned-at": new Date(date).toISOString(),
			campaign: false,
		});

		if (error) {
			throw new Error(`Error assigning territory: ${error.message}`);
		}
	}

	static async territorySync(synced: boolean, territoryId: number) {
		const { error } = await SupabaseService.from("territories")
			.update({ synced })
			.eq("id", territoryId);

		if (error) {
			throw new Error(`Error assigning territory: ${error.message}`);
		}
	}

	static async returnTerritory(assignmentId: number) {
		const { error } = await SupabaseService.from("assignments")
			.update({ "returned-at": new Date().toISOString() })
			.eq("id", assignmentId);

		if (error) {
			throw new Error(`Error assigning territory: ${error.message}`);
		}
	}
}
