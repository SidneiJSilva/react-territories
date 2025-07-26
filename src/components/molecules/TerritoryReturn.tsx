import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Typography, Button } from "@mui/material";
import { statusColors } from "@/constants/colors";
import type { TerritoryDetails } from "@/interfaces";

import { useTerritories } from "@/hooks";

export default function TerritoryReturn({ data }: { data: TerritoryDetails }) {
	const { returnTerritory } = useTerritories();

	const handleOnClick = async () => {
		await returnTerritory(data.assignmentid, data.id);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
					color: statusColors.assigned,
				}}
			>
				<ReplayIcon />

				<Typography variant="body1" fontWeight={700}>
					Devolução
				</Typography>
			</Box>

			<Button variant="contained" onClick={handleOnClick}>
				Devolver
			</Button>
		</Box>
	);
}
