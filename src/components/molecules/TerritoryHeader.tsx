import { Box, Typography } from "@mui/material";
import { SyncStatus } from "@/components/atoms/SyncStatus";
import { StatusIcon } from "@/components/atoms/icons/StatusIcon";

export function TerritoryHeader({
	firstname,
	lastname,
	synced,
	status,
}: {
	firstname?: string;
	lastname?: string;
	synced: boolean;
	status: string;
}) {
	return (
		<Box display="flex" justifyContent="space-between" alignItems="center">
			<Box>
				{status !== "resting" && status !== "available" && (
					<Box display="flex" alignItems="baseline" gap={0.5}>
						<Typography variant="subtitle1" fontWeight="bold">
							{firstname || "Available"}
						</Typography>
						<Typography sx={{ fontSize: ".7rem" }}>
							{lastname || "Available"}
						</Typography>
					</Box>
				)}
				<SyncStatus synced={synced} />
			</Box>

			<StatusIcon status={status} />
		</Box>
	);
}
