export interface TerritoryInterface {
	id: number;
	number: number;
	territoryarea: string;
	territorytype: string;
	link: string | null;
	synced: boolean;
	boundaries: string[] | null;
	comment: string | null;

	// Last assignment details
	assignedat: string | null;
	returnedat: string | null;

	// People details
	peopleid: number | null;
	firstname: string | null;
	lastname: string | null;

	// Status and delay information
	status: "assigned" | "resting" | "delayed" | "delayed_soon" | "available";
	daystodelay: number | null;
	delayedbydays: number | null;
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
	status: "assigned" | "resting" | "delayed" | "delayed_soon" | "available";
	comment: string | null;
}
