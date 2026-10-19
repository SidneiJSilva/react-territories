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
import TerritoryComments from "./TerritoryComments";
import { Box, Typography } from "@mui/material";
import {
	statusColors,
	statusBgColors,
	statusBorderColors,
} from "@/constants/colors";

import { useTerritories } from "@/hooks";
import { useDialogStore } from "@/stores/dialogStore";
import { useState } from "react";
import { territoriesStore } from "@/stores/territoriesStore";

export default function TerritoryDialog() {
	const { open, data, closeDialog } = useDialogStore();
	const [isDeleting, setIsDeleting] = useState(false);
	const [idToDelete, setIdToDelete] = useState<number | null>(null);
	const [typeToDelete, setTypeToDelete] = useState<string>("");
	const { deleteAssignment: onDeleteAssignment, deleteTerritoryComment } =
		useTerritories();
	const { isLoading } = territoriesStore();

	if (!data) return null;

	const deleteAssignment = async () => {
		if (typeToDelete === "history") {
			await onDeleteAssignment(idToDelete!, data.id);
		} else if (typeToDelete === "comments") {
			await deleteTerritoryComment(data.id, idToDelete!);
		}
		setIsDeleting(false);
	};

	const askForConfirmation = (id: number, type: "history" | "comments") => {
		setIsDeleting(true);
		setIdToDelete(id);
		setTypeToDelete(type);
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
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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

				<TerritoryComments
					territoryId={data.id}
					onDelete={askForConfirmation}
					comments={data.comments ?? []}
					isDeleting={isDeleting}
				/>
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

							<Button
								variant="outlined"
								size="small"
								sx={{
									color: statusColors["common"],
									backgroundColor: statusBgColors["common"],
									borderColor: statusBorderColors["common"],
									borderRadius: ".5rem",
								}}
								onClick={cancelDelete}
							>
								Cancelar
							</Button>

							<Button
								variant="outlined"
								size="small"
								sx={{
									color: statusColors["delayed"],
									backgroundColor: statusBgColors["delayed"],
									borderColor: statusBorderColors["delayed"],
									borderRadius: ".5rem",
								}}
								onClick={deleteAssignment}
							>
								Confirmar
							</Button>
						</Box>
					) : (
						<div></div>
					)}

					<Box
						sx={{
							display: "flex",
							gap: 1,
						}}
					>
						{!data.synced && <TerritorySync territoryId={data.id} />}

						<Button
							variant="outlined"
							size="small"
							sx={{
								color: statusColors["common"],
								backgroundColor: statusBgColors["common"],
								borderColor: statusBorderColors["common"],
								borderRadius: ".5rem",
							}}
							onClick={closeDialog}
						>
							Fechar
						</Button>
					</Box>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
