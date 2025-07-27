// src/components/organisms/TerritoryDialog.tsx
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import TerritoryDialogHistory from "@/components/molecules/TerritoryDialogHistory";
import TerritoryDialogHeader from "../molecules/TerritoryDialogHeader";
import TerritoryReturn from "@/components/molecules/TerritoryReturn";
import TerritoryAssign from "../molecules/TerritoryAssign";
import TerritorySync from "../molecules/TerritorySync";

import { useDialogStore } from "@/stores/dialogStore";

export default function TerritoryDialog() {
	const { open, data, closeDialog } = useDialogStore();

	if (!data) return null;

	return (
		<Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
			<TerritoryDialogHeader data={data} />

			<DialogContent
				sx={{ display: "flex", flexDirection: "column", gap: 4 }}
				dividers
			>
				{data.status === "available" ? (
					<TerritoryAssign data={data} />
				) : data.status === "resting" ? (
					<></>
				) : (
					<TerritoryReturn data={data} />
				)}

				<TerritoryDialogHistory assignments={data.assignments} />

				{!data.synced && <TerritorySync territoryId={data.id} />}
			</DialogContent>

			<DialogActions>
				<Button onClick={closeDialog}>Fechar</Button>
			</DialogActions>
		</Dialog>
	);
}
