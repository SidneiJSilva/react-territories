import { Chip } from "@mui/material";
import { pt } from "@/constants/lang";

type StatusKey = keyof typeof pt.status;

export function StatusChip({
	status,
	isDarkText,
}: {
	status: StatusKey;
	isDarkText?: boolean;
}) {
	return (
		<Chip
			label={pt.status[status].toUpperCase()}
			sx={{
				backgroundColor: "rgba(0, 0, 0, 0.15)",
				color: isDarkText ? "#000" : "#fff",
				fontWeight: "bold",
			}}
			size="small"
		/>
	);
}
