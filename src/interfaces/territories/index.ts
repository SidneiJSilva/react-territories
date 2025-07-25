export interface TerritoryInterface {
	id: number;
	number: number;
	territoryarea: string;
	territorytype: string;
	link: string | null;
	synced: boolean;
	boundaries: string[] | null;

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
