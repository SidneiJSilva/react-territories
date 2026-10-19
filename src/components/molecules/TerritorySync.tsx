import SyncIcon from "@mui/icons-material/Sync";
import { Button } from "@mui/material";
import {
	statusColors,
	statusBgColors,
	statusBorderColors,
} from "@/constants/colors";
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
		<Button
			variant="outlined"
			size="small"
			startIcon={<SyncIcon />}
			sx={{
				color: statusColors["delayed_soon"],
				backgroundColor: statusBgColors["delayed_soon"],
				borderColor: statusBorderColors["delayed_soon"],
				borderRadius: ".5rem",
			}}
			onClick={handleOnClick}
		>
			Sync
		</Button>
	);
}
