import type { PeopleInterface } from "@/interfaces";
import { apiFetch } from "@/services/api-service";
import SupabaseService from "@/services/supabase-service";

export class PeopleService {
	static async fetchPeople(): Promise<PeopleInterface[]> {
		const { data, error } = await SupabaseService.from("people_view")
			.select("*")
			.order("firstname");

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}

		return data as unknown as PeopleInterface[];
	}

	static async fetchPeopleRasp(): Promise<PeopleInterface[]> {
		const response = await apiFetch(`${import.meta.env.VITE_API_URL}/people`);

		if (!response.ok) {
			throw new Error(`Error fetching people: ${response.status}`);
		}

		return response.json();
	}
}
