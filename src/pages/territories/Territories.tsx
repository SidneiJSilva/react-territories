import Box from "@mui/material/Box";
import TerritoriesList from "@/components/organisms/TerritoriesList";

import { useEffect } from "react";
import { useTerritories } from "@/hooks";

export default function Territories() {
	const { fetchTerritories } = useTerritories();

	useEffect(() => {
		const fetchData = async () => {
			await fetchTerritories();
		};

		fetchData();
	}, []);

	return (
		<Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
			<Box
				sx={{
					backgroundColor: "#fff",
					padding: "1rem 2rem",
					boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
					zIndex: 10,
					position: "sticky",
					top: 0,
				}}
			>
				<h1>Filtros</h1>
			</Box>

			<TerritoriesList />
		</Box>
	);
}
