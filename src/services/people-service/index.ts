import type { PeopleInterface } from "@/interfaces";
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
}
