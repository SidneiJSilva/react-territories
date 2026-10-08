import type {
	TerritoryInterface,
	TerritoryDetails,
	PersonTerritories,
} from "@/interfaces";
import SupabaseService from "@/services/supabase-service";
import { apiFetch } from "@/services/api-service";

const TABLE_NAME = "territories_view";
export class TerritoriesService {
	static async fetchTerritories(): Promise<TerritoryInterface[]> {
		console.log("first fetchTerritories");
		const { data, error } = await SupabaseService.from(TABLE_NAME)
			.select("*")
			.order("id");

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}

		return data as unknown as TerritoryInterface[];
	}

	static async fetchTerritoriesRasp(): Promise<TerritoryInterface[]> {
		const response = await apiFetch(
			`${import.meta.env.VITE_API_URL}/territories`,
		);

		if (!response.ok) {
			throw new Error(`Error fetching territories: ${response.status}`);
		}

		return response.json();
	}

	// static async fetchTerritoryDetails(id: number): Promise<TerritoryDetails> {
	// 	const { data, error } = await SupabaseService.rpc("get_territory_by_id", {
	// 		territory_id: id,
	// 	});

	// 	if (error) {
	// 		throw new Error(`Error fetching territories: ${error.message}`);
	// 	}

	// 	return data[0] as unknown as TerritoryDetails;
	// }

	static async fetchTerritoryDetails(id: number): Promise<TerritoryDetails> {
		const response = await apiFetch(
			`${import.meta.env.VITE_API_URL}/territories/${id}`,
		);

		if (!response.ok) {
			throw new Error(`Error fetching territory: ${response.status}`);
		}

		return response.json();
	}

	static async assignTerritory(
		territoryId: number,
		peopleId: number,
		date: string,
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

	static async assignTerritoryRasp(
		territoryId: number,
		peopleId: number,
		date: string,
	) {
		const response = await apiFetch(
			`${import.meta.env.VITE_API_URL}/assignments`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					territoryId,
					personId: peopleId,
					assignedAt: new Date(date).toISOString(),
				}),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Error assigning territory");
		}

		return response.json();
	}

	static async territorySync(synced: boolean, territoryId: number) {
		const { error } = await SupabaseService.from("territories")
			.update({ synced })
			.eq("id", territoryId);

		if (error) {
			throw new Error(`Error assigning territory: ${error.message}`);
		}
	}

	static async territorySyncRasp(synced: boolean, territoryId: number) {
		const response = await apiFetch(
			`${import.meta.env.VITE_API_URL}/territories/${territoryId}/sync`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					synced,
				}),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Error updating territory sync status");
		}

		return response.json();
	}

	static async returnTerritory(assignmentId: number, date: string) {
		const { error } = await SupabaseService.from("assignments")
			.update({ "returned-at": new Date(date).toISOString() })
			.eq("id", assignmentId);

		if (error) {
			throw new Error(`Error assigning territory: ${error.message}`);
		}
	}

	static async returnTerritoryRasp(assignmentId: number, date: string) {
		const response = await apiFetch(
			`${import.meta.env.VITE_API_URL}/assignments/${assignmentId}/return`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					returnedAt: new Date(date).toISOString(),
				}),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Error returning territory");
		}

		return response.json();
	}

	static async deleteAssignment(assignmentId: number) {
		const { error } = await SupabaseService.from("assignments")
			.delete()
			.eq("id", assignmentId);

		if (error) {
			throw new Error(`Error assigning territory: ${error.message}`);
		}
	}

	static async deleteAssignmentRasp(assignmentId: number) {
		const response = await apiFetch(
			`${import.meta.env.VITE_API_URL}/assignments/${assignmentId}`,
			{
				method: "DELETE",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || "Error deleting assignment");
		}
	}

	static async updateTerritoryComment(
		territoryId: number,
		comment: string | null,
	) {
		const { error } = await SupabaseService.from("territories")
			.update({ comment })
			.eq("id", territoryId);

		if (error) {
			throw new Error(`Error updating territory comment: ${error.message}`);
		}
	}

	static async fetchPersonTerritories(peopleId: number) {
		const { data, error } = await SupabaseService.rpc(
			"get_person_territories",
			{
				people_id: peopleId,
			},
		);

		if (error) {
			throw new Error(`Error fetching person's territories: ${error.message}`);
		}

		return data as unknown as PersonTerritories[];
	}

	static async fetchPersonTerritoriesRasp(peopleId: number) {
		const response = await apiFetch(
			`${import.meta.env.VITE_API_URL}/people/${peopleId}/territories`,
		);

		if (!response.ok) {
			const error = await response.json();

			throw new Error(error.error || "Error fetching person's territories");
		}

		const result = await response.json();

		return result.data as PersonTerritories[];
	}
}
