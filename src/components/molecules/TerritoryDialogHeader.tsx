import { Box, DialogTitle } from "@mui/material";

import type { TerritoryDetails } from "@/interfaces";
import { statusColors } from "@/constants/colors";

export default function TerritoryDialogHeader({
	data,
}: {
	data: TerritoryDetails;
}) {
	const isDarkText = data.status === "delayed_soon";

	return (
		<DialogTitle
			sx={{
				backgroundColor: statusColors[data.status],
				color: isDarkText ? "black" : "white",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<div>{`${data.territoryarealabel} - ${data.territorytypelabel}`}</div>

				<Box
					sx={{
						backgroundColor: "white",
						color: isDarkText ? "black" : statusColors[data.status],
						width: "40px",
						height: "40px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "100%",
					}}
				>
					{data.number}
				</Box>
			</Box>
		</DialogTitle>
	);
}
