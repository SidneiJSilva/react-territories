import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SCard from "@/components/atoms/cards/SCard";
import TerritoryListItem from "@/components/organisms/TerritoryListItem";

import { territoriesStore } from "@/stores/territoriesStore";

export default function TerritoriesList() {
	const { groupedTerritories } = territoriesStore();

	return (
		<Box
			sx={{
				flex: 1,
				overflowY: "auto",
				backgroundColor: "#f0f0f0",
				padding: "2rem",
			}}
		>
			{Object.entries(groupedTerritories).map(([groupName, territories]) => (
				<Box
					key={groupName}
					sx={{
						marginBottom: "2rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<SCard>
						<Typography variant="h5" fontWeight="bold">
							{groupName}
						</Typography>
					</SCard>

					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							gap: "1rem",
							justifyContent: "space-between",
						}}
					>
						{territories.map((territory) => (
							<TerritoryListItem key={territory.id} territory={territory} />
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
}
