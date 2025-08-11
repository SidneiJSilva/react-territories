import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SCard from "@/components/atoms/cards/SCard";
import TerritoryListItem from "@/components/organisms/TerritoryListItem";
import { territoriesStore } from "@/stores/territoriesStore";

import { statusIcons } from "@/constants/statusIcons";

export default function TerritoriesList() {
	const { territoriesList, statusCounts } = territoriesStore();

	return (
		<Box
			sx={{
				flex: 1,
				overflowY: "auto",
				backgroundColor: "#f0f0f0",
				padding: "2rem",
			}}
		>
			<SCard sx={{ marginBottom: "1rem" }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography variant="h5" fontWeight="bold">
						Status
					</Typography>

					<Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
						{Object.entries(statusCounts).map(([status, count]) => {
							const Icon = statusIcons[status];
							if (!Icon) return null;

							return (
								<Box
									key={status}
									sx={{
										display: "flex",
										alignItems: "center",
										gap: "0.25rem",
										color: Icon.color,
									}}
								>
									{Icon.icon}
									<Typography variant="body2">{count}</Typography>
								</Box>
							);
						})}
					</Box>
				</Box>
			</SCard>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 1fr)", // sempre 2 colunas
					gap: "1rem",
				}}
			>
				{territoriesList.map((territory) => (
					<TerritoryListItem
						from="list"
						key={territory.id}
						territory={territory}
					/>
				))}
			</Box>
		</Box>
	);
}
