// src/components/organisms/TerritoryDialog.tsx
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	CircularProgress,
} from "@mui/material";
import TerritoryDialogHistory from "@/components/molecules/TerritoryDialogHistory";
import TerritoryDialogHeader from "../molecules/TerritoryDialogHeader";
import TerritoryReturn from "@/components/molecules/TerritoryReturn";
import TerritoryAssign from "../molecules/TerritoryAssign";
import TerritorySync from "../molecules/TerritorySync";
import { Box, Typography } from "@mui/material";

import { useTerritories } from "@/hooks";
import { useDialogStore } from "@/stores/dialogStore";
import { useState } from "react";
import { territoriesStore } from "@/stores/territoriesStore";

export default function TerritoryDialog() {
	const { open, data, closeDialog } = useDialogStore();
	const [isDeleting, setIsDeleting] = useState(false);
	const [idToDelete, setIdToDelete] = useState<number | null>(null);
	const { deleteAssignment: onDeleteAssignment } = useTerritories();
	const { isLoading } = territoriesStore();

	if (!data) return null;

	const deleteAssignment = async () => {
		await onDeleteAssignment(idToDelete!, data.id);
		setIsDeleting(false);
	};

	const askForConfirmation = (id: number) => {
		setIsDeleting(true);
		setIdToDelete(id);
	};

	const cancelDelete = () => {
		setIsDeleting(false);
		setIdToDelete(null);
	};

	return (
		<Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
			{isLoading && (
				<Box
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						bgcolor: "rgba(255,255,255,0.6)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 10,
					}}
				>
					<CircularProgress size={70} />
				</Box>
			)}

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

				<TerritoryDialogHistory
					onDelete={askForConfirmation}
					assignments={data.assignments}
					isDeleting={isDeleting}
				/>

				{!data.synced && <TerritorySync territoryId={data.id} />}
			</DialogContent>

			<DialogActions>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
						alignItems: "center",
					}}
				>
					{isDeleting ? (
						<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
							<Typography variant="body2" fontWeight={700}>
								REMOVER?
							</Typography>

							<Button size="small" onClick={cancelDelete}>
								Cancelar
							</Button>

							<Button
								color="error"
								size="small"
								variant="contained"
								onClick={deleteAssignment}
							>
								Confirmar
							</Button>
						</Box>
					) : (
						<div></div>
					)}

					<Button onClick={closeDialog}>Fechar</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
