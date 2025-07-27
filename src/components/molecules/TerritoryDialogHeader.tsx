import { Box, DialogTitle } from "@mui/material";
import type { TerritoryDetails } from "@/interfaces";
import { statusColors } from "@/constants/colors";

export default function TerritoryDialogHeader({
	data,
}: {
	data: TerritoryDetails;
}) {
	const isDarkText = data.status === "delayed_soon";

	const handleCopy = () => {
		if (data.link) {
			navigator.clipboard.writeText(data.link).then(() => {
				console.log("Link copiado para a área de transferência!");
				// TODO implementar feedback visual quando fizer as notifcações globais
			});
		}
	};

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
					onClick={handleCopy}
					sx={{
						cursor: "pointer",
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
