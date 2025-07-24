export interface People {
	id: number;
	"first-name": string;
	"last-name": string;
}

export interface Assignment {
	"assigned-at": string;
	"people-id": number;
	"returned-at": string;
	"territories-people": People[];
	"territory-id": number;
}

export interface TerritoryArea {
	label: string;
}

export interface TerritoryType {
	label: string;
}

export interface TerritoryInterface {
	id: number;
	number: string;
	link: string;
	synced: boolean;
	assignments: Assignment[];
	boundaries: string[];

	"territory-area": TerritoryArea;
	"territory-type": TerritoryType;
}
