import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SCard from "@/components/atoms/cards/SCard";
import TerritoryListItem from "@/components/organisms/TerritoryListItem";
import { territoriesStore } from "@/stores/territoriesStore";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HotelIcon from "@mui/icons-material/Hotel";

import { statusColors } from "@/constants/colors";

const statusIcons: Record<string, { icon: React.ReactNode; color: string }> = {
	assigned: {
		icon: <AssignmentTurnedInIcon />,
		color: statusColors.assigned,
	},
	available: {
		icon: <CheckCircleIcon />,
		color: statusColors.available,
	},
	delayed: {
		icon: <ErrorIcon />,
		color: statusColors.delayed,
	},
	delayed_soon: {
		icon: <AccessTimeIcon />,
		color: statusColors.delayed_soon,
	},
	resting: {
		icon: <HotelIcon />,
		color: statusColors.resting,
	},
};

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
			{groupedTerritories.map((group) => (
				<Box
					key={group.area}
					sx={{
						marginBottom: "2rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<SCard>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Typography variant="h5" fontWeight="bold">
								{group.area}
							</Typography>

							<Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
								{Object.entries(group.stats).map(([status, count]) => {
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
							display: "flex",
							flexWrap: "wrap",
							gap: "1rem",
							justifyContent: "space-between",
						}}
					>
						{group.territories.map((territory) => (
							<TerritoryListItem key={territory.id} territory={territory} />
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
}
