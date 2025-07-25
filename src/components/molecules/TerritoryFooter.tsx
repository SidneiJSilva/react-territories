import { Box, Typography } from "@mui/material";
import { StatusChip } from "@/components/atoms/StatusChip";

export function TerritoryFooter({
	status,
	delayedbydays,
	daystodelay,
	number,
	link,
	isDarkText,
}: {
	status: "assigned" | "resting" | "delayed_soon" | "delayed" | "available";
	delayedbydays?: number;
	daystodelay?: number;
	number: number;
	link?: string;
	isDarkText: boolean;
}) {
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			mt={2}
		>
			<Box display="flex" alignItems="center">
				<StatusChip status={status} isDarkText={isDarkText} />
				<Box sx={{ fontSize: 10, paddingLeft: ".5rem" }}>
					{status === "delayed" && <div>{`${delayedbydays} dias`}</div>}
					{status === "delayed_soon" && <div>{`${daystodelay} dias`}</div>}
				</Box>
			</Box>

			<Typography
				variant="h5"
				fontWeight="bold"
				onClick={(e) => {
					e.preventDefault();
					if (!link) return;
					window.open(link, "BLANK");
				}}
			>
				{number}
			</Typography>
		</Box>
	);
}
