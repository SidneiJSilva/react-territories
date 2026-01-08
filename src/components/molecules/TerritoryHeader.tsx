import { Box, Typography } from "@mui/material";
import { SyncStatus } from "@/components/atoms/SyncStatus";
import { StatusIcon } from "@/components/atoms/icons/StatusIcon";
import { Comment } from "@mui/icons-material";

export function TerritoryHeader({
	firstname,
	lastname,
	synced,
	status,
	comment,
}: {
	firstname?: string;
	lastname?: string;
	synced: boolean;
	status: string;
	comment?: string;
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

			<Box display="flex" gap={1} alignItems="center">
				{comment && <Comment />}

				<StatusIcon status={status} />
			</Box>
		</Box>
	);
}
