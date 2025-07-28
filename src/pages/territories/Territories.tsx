import Box from "@mui/material/Box";
import TerritoriesList from "@/components/organisms/TerritoriesList";
import LoadingFullScreen from "@/components/atoms/LoadingFullScreen";
import Header from "@/components/organisms/Header";

import { useEffect } from "react";
import { useTerritories, usePeople } from "@/hooks";
import { territoriesStore } from "@/stores/territoriesStore";

export default function Territories() {
	const { fetchTerritories } = useTerritories();
	const { fetchPeople } = usePeople();
	const { isFetchingTerritories } = territoriesStore();

	useEffect(() => {
		const fetchData = async () => {
			await fetchTerritories();
			await fetchPeople();
		};

		fetchData();
	}, []);

	return (
		<>
			{isFetchingTerritories ? (
				<LoadingFullScreen size={100} />
			) : (
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
						<Header />
					</Box>

					<TerritoriesList />
				</Box>
			)}
		</>
	);
}
