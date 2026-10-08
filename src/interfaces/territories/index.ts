export interface TerritoryInterface {
	id: number;
	number: number;
	territoryarea: string;
	territorytype: string;
	territory_area: string;
	territory_type: string;
	link: string | null;
	synced: boolean;
	boundaries: string[] | null;
	comment: string | null;

	// Last assignment details
	assignedat: string | null;
	returnedat: string | null;

	// People details
	peopleid?: number | null;
	assignment_person_id: number;
	firstname: string | null;
	lastname: string | null;
	first_name: string | null;
	last_name: string | null;

	// Status and delay information
	status: "assigned" | "resting" | "delayed" | "delayed_soon" | "available";
	daystodelay: number | null;
	delayedbydays: number | null;
	days_to_delay: number | null;
	delayed_by_days: number | null;
}

export interface GroupedTerritoryArea {
	area: string;
	stats: Record<TerritoryInterface["status"], number>;
	territories: TerritoryInterface[];
}

export interface Assignment {
	assignedAt: string;
	campaign: boolean;
	firstName: string;
	id: number;
	assignmentId: number;
	lastName: string;
	peopleId: number;
	returnedAt: string | null;
}

export interface TerritoryDetails {
	assignmentid: number;
	assignments: Assignment[];
	id: number;
	link: string | null;
	number: number;
	synced: boolean;
	territoryarealabel: string;
	territorytypelabel: string;
	territory_area: string;
	territory_type: string;
	status: "assigned" | "resting" | "delayed" | "delayed_soon" | "available";
	comment: string | null;
}
