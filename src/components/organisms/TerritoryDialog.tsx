// src/components/organisms/TerritoryDialog.tsx

import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from "@mui/material";
import TerritoryDialogHistory from "@/components/molecules/TerritoryDialogHistory";
import { useDialogStore } from "@/stores/dialogStore";
import HistoryIcon from "@mui/icons-material/History";
import { statusColors } from "@/constants/colors";

export default function TerritoryDialog() {
	const { open, data, closeDialog } = useDialogStore();

	if (!data) return null;

	return (
		<Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
			<DialogTitle sx={{ backgroundColor: "gray", color: "white" }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div>{`${data.territoryarealabel} - ${data.territorytypelabel}`}</div>

					<Box
						sx={{
							backgroundColor: "white",
							color: "gray",
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

			<DialogContent dividers>
				<Box sx={{ display: "flex", gap: 1, color: statusColors.assigned }}>
					<HistoryIcon />

					<Typography variant="body1" fontWeight={700}>
						Histórico
					</Typography>
				</Box>

				<TerritoryDialogHistory assignments={data.assignments} />
			</DialogContent>

			<DialogActions>
				<Button onClick={closeDialog}>Fechar</Button>
			</DialogActions>
		</Dialog>
	);
}
