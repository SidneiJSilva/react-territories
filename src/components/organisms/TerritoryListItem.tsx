import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import SCard from "@/components/atoms/cards/SCard";
import { StatusIcon } from "@/components/atoms/icons/StatusIcon";
import { SyncStatus } from "@/components/atoms/SyncStatus";

import { type TerritoryInterface } from "@/interfaces";
import {
	statusColors,
	statusBgColors,
	statusBorderColors,
} from "@/constants/colors";
import { useTerritories } from "@/hooks";

export default function TerritoryListItem({
	territory,
}: {
	territory: TerritoryInterface;
	from: "list" | "group";
}) {
	const { fetchTerritoryDetails } = useTerritories();

	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);
		try {
			await fetchTerritoryDetails(territory.id);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<SCard
				sx={{
					position: "relative",
					flex: {
						xs: "1 1 100%",
						sm: "1 1 calc(50% - 0.5rem)",
					},
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: ".5rem",
					boxSizing: "border-box",
					borderRadius: ".5rem",
					borderLeft: "8px solid",
					borderColor: statusColors[territory.status],
					cursor: "pointer",
					userSelect: "none",
				}}
				onClick={handleClick}
			>
				{isLoading && (
					<Box
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							bgcolor: "rgba(255,255,255,0.6)",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: "1rem",
							zIndex: 10,
						}}
					>
						<CircularProgress size={40} />
					</Box>
				)}

				<>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "1rem",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								gap: "0.5rem",
							}}
						>
							<Box
								sx={{
									width: "2rem",
									borderRadius: ".5rem",
									backgroundColor: statusColors[territory.status],
									textAlign: "center",
								}}
							>
								<Typography
									variant="body1"
									component="span"
									sx={{ color: "#fff", fontWeight: "bold" }}
								>
									{territory.number}
								</Typography>
							</Box>

							<Typography
								variant="h6"
								component="span"
								sx={{ fontWeight: "bold" }}
							>
								{territory.territory_area}
							</Typography>
						</Box>

						<Box
							sx={{
								border: "2px solid",
								borderRadius: "1rem",
								color: statusColors[territory.status],
								padding: "0.25rem 0.5rem",
								fontSize: "0.75rem",
								textTransform: "capitalize",
								borderColor: statusBorderColors[territory.status],
								backgroundColor: statusBgColors[territory.status],
							}}
						>
							<SyncStatus synced={territory.synced} />
						</Box>
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: "1rem",
						}}
					>
						<Box
							sx={{
								color: statusColors[territory.status],
								border: `3px solid ${statusBorderColors[territory.status]}`,
								backgroundColor: statusBgColors[territory.status],
								borderRadius: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "3.2rem",
								height: "3.2rem",
							}}
						>
							<StatusIcon status={territory.status} />
						</Box>

						<Box sx={{ display: "flex", flexDirection: "column" }}>
							{(territory.status === "delayed" ||
								territory.status === "delayed_soon" ||
								territory.status === "assigned") && (
								<Box>
									<Typography
										component="span"
										sx={{
											fontWeight: "bold",
											color: "#000",
											fontSize: "1.1rem",
										}}
									>
										{`${territory.first_name ?? ""} ${territory.last_name ?? ""}`}
									</Typography>
								</Box>
							)}

							{territory.status === "assigned" && (
								<Box>
									<Typography
										variant="caption"
										component="span"
										sx={{
											fontWeight: "bold",
											color: statusColors[territory.status],
										}}
									>
										{`Trabalhando há ${territory.worked_days} dias`}
									</Typography>
								</Box>
							)}

							{territory.status === "delayed_soon" && (
								<Box>
									<Typography
										variant="caption"
										component="span"
										sx={{
											fontWeight: "bold",
											color: statusColors[territory.status],
										}}
									>
										{`${territory.days_to_delay} dias para atrasar`}
									</Typography>
								</Box>
							)}

							{territory.status === "delayed" && (
								<Box>
									<Typography
										variant="caption"
										component="span"
										sx={{
											fontWeight: "bold",
											color: statusColors[territory.status],
										}}
									>
										{` Atrasado há ${territory.delayed_by_days} dias`}
									</Typography>
								</Box>
							)}
						</Box>
					</Box>
				</>
			</SCard>
		</div>
	);
}
