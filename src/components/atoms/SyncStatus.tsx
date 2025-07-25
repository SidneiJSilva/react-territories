import { Box, Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";

export function SyncStatus({ synced }: { synced: boolean }) {
	return (
		<Box display="flex" alignItems="center" gap={0.5}>
			{synced ? (
				<CloudIcon sx={{ fontSize: 10 }} />
			) : (
				<CloudOutlinedIcon sx={{ fontSize: 10 }} />
			)}
			<Typography sx={{ fontSize: 10 }}>
				{synced ? "Sincronizado" : "Não sincronizado"}
			</Typography>
		</Box>
	);
}
