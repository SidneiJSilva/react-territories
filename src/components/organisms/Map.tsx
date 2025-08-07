import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { territoriesStore } from "@/stores/territoriesStore";
import { statusColors } from "@/constants/colors";
import { type TerritoryInterface } from "@/interfaces";

// Verifica e transforma coordenadas em [number, number][]
const parseBoundaries = (boundaries: unknown): [number, number][] => {
	if (!Array.isArray(boundaries)) return [];
	return boundaries
		.filter((b): b is [number, number] => Array.isArray(b) && b.length === 2)
		.map(([lng, lat]) => [Number(lng), Number(lat)]);
};

// Função para pegar o centro do primeiro território válido
const getFirstValidCenter = (
	territories: TerritoryInterface[]
): [number, number] => {
	for (const t of territories) {
		const coords = parseBoundaries(t.boundaries);
		if (coords.length > 0) return coords[0];
	}
	return [0, 0]; // fallback
};

export default function Map() {
	const { territories } = territoriesStore();
	const residentialTerritories = territories.filter(
		(t) => t.territorytype === "Residencial"
	);

	const center = getFirstValidCenter(residentialTerritories);

	return (
		<MapContainer
			center={center}
			zoom={17}
			style={{ height: "100vh", width: "100%" }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				// Atualizado: nome correto da prop
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{residentialTerritories.map((territory) => {
				const coordinates = parseBoundaries(territory.boundaries);
				if (coordinates.length === 0) return null;

				return (
					<Polygon
						key={territory.id}
						positions={coordinates}
						pathOptions={{
							color: "#000000", // Borda
							weight: 2,
							fillColor: statusColors[territory.status],
							fillOpacity: 0.5,
						}}
					>
						<Tooltip permanent>
							<strong>{territory.id}</strong>
						</Tooltip>
					</Polygon>
				);
			})}
		</MapContainer>
	);
}
