import { Box, DialogTitle, Typography, IconButton } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import type { TerritoryDetails } from "@/interfaces";
import { statusColors } from "@/constants/colors";

export default function TerritoryDialogHeader({
	data,
}: {
	data: TerritoryDetails;
}) {
	const handleCopy = () => {
		if (data.link) {
			navigator.clipboard.writeText(data.link).then(() => {
				console.log("Link copiado para a área de transferência!");
				// TODO implementar feedback visual quando fizer as notifcações globais
			});
		}
	};

	return (
		<DialogTitle>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: "0.5rem",
					}}
				>
					<Box
						sx={{
							borderRadius: ".5rem",
							backgroundColor: statusColors[data.status],
							textAlign: "center",
							paddingLeft: "0.5rem",
							paddingRight: "0.5rem",
						}}
					>
						<Typography
							variant="h5"
							component="span"
							sx={{ color: "#fff", fontWeight: "bold" }}
						>
							{data.number}
						</Typography>
					</Box>

					<Box>
						<Typography
							variant="h6"
							component="div"
							sx={{ fontWeight: "bold", lineHeight: 1.2 }}
						>
							{data.territory_area}
						</Typography>

						<Typography
							variant="caption"
							component="div"
							sx={{ color: "#898888fb", lineHeight: 1.2 }}
						>
							{data.territory_type}
						</Typography>
					</Box>
				</Box>

				<IconButton onClick={handleCopy}>
					<LinkIcon />
				</IconButton>
			</Box>
		</DialogTitle>
	);
}
