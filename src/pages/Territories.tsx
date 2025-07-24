import Box from "@mui/material/Box";
import { type TerritoryInterface } from "@/interfaces";
import { territoriesStore } from "@/stores/territoriesStore";
import { useEffect } from "react";
import { useTerritories } from "@/hooks";

export default function Territories() {
	const { territories } = territoriesStore() as {
		territories: TerritoryInterface[];
	};

	const { fetchTerritories } = useTerritories();

	useEffect(() => {
		const fetchData = async () => {
			await fetchTerritories();
		};

		fetchData();
	}, []);

	return (
		<Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
			{/* 🔼 Header fixo */}
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

			{/* 🔽 Lista com rolagem se necessário */}
			<Box
				sx={{
					flex: 1,
					overflowY: "auto",
					backgroundColor: "#f0f0f0",
					padding: "2rem",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						gap: "1rem",
						justifyContent: "space-between",
					}}
				>
					{territories.map((territory: TerritoryInterface) => (
						<Box
							key={territory.id}
							sx={{
								flex: {
									xs: "1 1 100%",
									sm: "1 1 calc(50% - 0.5rem)",
								},
								padding: "1rem",
								backgroundColor: "#fff",
								borderRadius: "8px",
								boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
								boxSizing: "border-box",
							}}
						>
							<h2>{territory.id}</h2>
							<p>{territory.synced ? "Sincronizado" : "Desincronizado"}</p>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
}
