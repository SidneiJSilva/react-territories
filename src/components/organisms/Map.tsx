import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { territoriesStore } from "@/stores/territoriesStore";
import { statusColors } from "@/constants/colors";

export default function Map() {
	const { territories } = territoriesStore();

	// Centralizar no primeiro território Residencial com coordenadas válidas
	const getFirstValidCoordinate = () => {
		for (const t of territories) {
			if (
				t.territorytype === "Residencial" &&
				t.boundaries &&
				t.boundaries.length > 0
			) {
				const [lng, lat] = t.boundaries[0];
				return [lat, lng] as [number, number];
			}
		}
		return [0, 0];
	};

	const mapCenter = getFirstValidCoordinate();

	return (
		<MapContainer
			center={mapCenter}
			zoom={16}
			style={{ height: "100vh", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{territories
				.filter(
					(t) =>
						t.territorytype === "Residencial" &&
						t.boundaries &&
						t.boundaries.length >= 3
				)
				.map((territory) => {
					const coordinates = territory.boundaries.map(([lng, lat]) => [
						lat,
						lng,
					]);

					const center: [number, number] = coordinates.reduce(
						([sumLat, sumLng], [lat, lng], _, arr) => [
							sumLat + lat / arr.length,
							sumLng + lng / arr.length,
						],
						[0, 0]
					);

					return (
						<Polygon
							key={territory.id}
							positions={coordinates}
							pathOptions={{
								color: "#000000", // Borda preta
								weight: 1, // Espessura da borda
								fillColor: statusColors[territory.status],
								fillOpacity: 0.2,
							}}
						>
							<Tooltip direction="center" permanent>
								<strong>{territory.id}</strong>
							</Tooltip>
						</Polygon>
					);
				})}
		</MapContainer>
	);
}
