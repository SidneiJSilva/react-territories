import Box from "@mui/material/Box";

import { type TerritoryInterface } from "@/interfaces";
import { territoriesStore } from "@/stores/territoriesStore";
import { useEffect } from "react";

export default function Territories() {
	const { territories, setTerritories } = territoriesStore() as {
		territories: TerritoryInterface[];
		setTerritories: (territories: TerritoryInterface[]) => void;
	};

	useEffect(() => {
		// Simulate fetching territories data
		const fetchedTerritories: TerritoryInterface[] = [
			{
				id: "1",
				number: "001",
				area: "North",
				type: "Urban",
				link: "/territories/1",
				synced: true,
				boundaries: ["boundary1", "boundary2"],
			},
			{
				id: "2",
				number: "002",
				area: "South",
				type: "Rural",
				link: "/territories/2",
				synced: false,
				boundaries: ["boundary3", "boundary4"],
			},
		];

		setTerritories(fetchedTerritories);
	}, []);

	return (
		<Box
			component="section"
			sx={{ backgroundColor: "#f0f0f0", padding: "2rem" }}
		>
			<h1>Territories Page</h1>
			<p>This is the Territories page content.</p>

			<Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				{territories.map((territory: TerritoryInterface) => (
					<Box
						key={territory.id}
						sx={{
							padding: "1rem",
							backgroundColor: "#fff",
							borderRadius: "8px",
							boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
						}}
					>
						<h2>{territory.type}</h2>
						<p>{territory.synced ? "Sincronizado" : "Desincronizado"}</p>
						<Box sx={{ display: "flex", gap: "0.5rem" }}>
							{territory.boundaries.map((boundary, index) => (
								<Box
									key={index}
									sx={{
										padding: "0.5rem",
										backgroundColor: "#e0e0e0",
										borderRadius: "4px",
									}}
								>
									{boundary}
								</Box>
							))}
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	);
}
