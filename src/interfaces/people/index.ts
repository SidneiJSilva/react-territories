export interface PeopleInterface {
	peopleid: number;
	firstname: string;
	lastname: string;
	fullname?: string;
	active: boolean;
	gender: string;
	genderid: string;
	regularpionner: boolean;
	techskills: boolean;
	tpapproved: boolean;
	id?: number;
}

export interface PersonTerritories {
	assignedAt: string;
	campaign: boolean;
	territoryArea: string;
	territoryId: number;
	id: number;
	returnedAt: string | null;
}
