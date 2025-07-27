import SyncIcon from "@mui/icons-material/Sync";
import { Box, Typography, Button } from "@mui/material";
import { statusColors } from "@/constants/colors";
import { useTerritories } from "@/hooks";

export default function TerritorySync({
	territoryId,
}: {
	territoryId: number;
}) {
	const { territorySync } = useTerritories();

	const handleOnClick = async () => {
		await territorySync(true, territoryId);
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
				<SyncIcon />

				<Typography variant="body1" fontWeight={700}>
					Sync
				</Typography>
			</Box>

			<Button variant="contained" onClick={handleOnClick}>
				Sincronizado
			</Button>
		</Box>
	);
}
