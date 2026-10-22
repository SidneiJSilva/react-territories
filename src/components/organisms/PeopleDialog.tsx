import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	DialogTitle,
	CircularProgress,
	Box,
	Typography,
	TextField,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

import { useDialogStore } from "@/stores/dialogStore";
import { useEffect, useState } from "react";
import {
	statusColors,
	statusBgColors,
	statusBorderColors,
	detailTextColors,
	cardColors,
} from "@/constants/colors";
import { usePeople } from "@/hooks";
import type { PeopleInterface } from "@/interfaces";

export default function TerritoryDialog() {
	const { openPerson, dataPerson, closePersonDialog } = useDialogStore();
	const { updatePerson } = usePeople();

	const [isLoading, setIsLoading] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	useEffect(() => {
		setFirstName(dataPerson?.firstname ?? "");
		setLastName(dataPerson?.lastname ?? "");
	}, [dataPerson]);

	const handleSave = async () => {
		setIsLoading(true);
		const personToUpdate = getPersonToUpdate();

		if (!dataPerson?.peopleid) return;

		try {
			await updatePerson(dataPerson.peopleid, personToUpdate);
		} finally {
			setIsLoading(false);
			closePersonDialog();
		}
	};

	const hasChanges =
		firstName !== dataPerson?.firstname || lastName !== dataPerson?.lastname;

	const getPersonToUpdate = () => {
		const personToUpdate: Partial<PeopleInterface> = {};

		if (firstName !== dataPerson?.firstname) {
			personToUpdate.firstname = firstName;
		}

		if (lastName !== dataPerson?.lastname) {
			personToUpdate.lastname = lastName;
		}

		return personToUpdate as PeopleInterface;
	};

	return (
		<Dialog
			open={openPerson}
			onClose={closePersonDialog}
			maxWidth="sm"
			fullWidth
		>
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

			<>
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
								alignItems: "center",
								flexDirection: "row",
								gap: 1,
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									padding: "0.5rem",
									borderRadius: ".5rem",
									backgroundColor: statusColors.available,
									color: "#fff",
								}}
							>
								<EditIcon />
							</Box>

							<Box>
								<Typography
									variant="h6"
									component="div"
									sx={{ fontWeight: "bold", lineHeight: 1.2 }}
								>
									Publicador
								</Typography>

								<Typography
									variant="caption"
									component="div"
									sx={{ color: detailTextColors.tertiary, lineHeight: 1.2 }}
								>
									Editar detalhes
								</Typography>
							</Box>
						</Box>
					</Box>
				</DialogTitle>

				<DialogContent dividers>
					<Box
						sx={{
							display: "flex",
							flexDirection: { xs: "column", sm: "row" },
							gap: 2,
							padding: 2,
							border: "1px solid",
							backgroundColor: cardColors.green.background,
							borderColor: cardColors.green.border,
							borderRadius: "2rem",
						}}
					>
						<TextField
							label="Nome"
							multiline
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
							disabled={isLoading}
							size="small"
							fullWidth
							sx={{
								flex: 1,
								"& .MuiOutlinedInput-root": {
									bgcolor: cardColors.green.surface,
									borderRadius: 3,

									"& fieldset": {
										borderColor: cardColors.green.border,
									},

									"&:hover fieldset": {
										borderColor: cardColors.green.primary,
									},

									"&.Mui-focused fieldset": {
										borderColor: cardColors.green.primary,
									},
								},

								"& .MuiInputLabel-root.Mui-focused": {
									color: cardColors.green.primary,
								},
							}}
						/>

						<TextField
							label="Apelido"
							multiline
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
							disabled={isLoading}
							size="small"
							fullWidth
							sx={{
								flex: 1,
								"& .MuiOutlinedInput-root": {
									bgcolor: cardColors.green.surface,
									borderRadius: 3,

									"& fieldset": {
										borderColor: cardColors.green.border,
									},

									"&:hover fieldset": {
										borderColor: cardColors.green.primary,
									},

									"&.Mui-focused fieldset": {
										borderColor: cardColors.green.primary,
									},
								},

								"& .MuiInputLabel-root.Mui-focused": {
									color: cardColors.green.primary,
								},
							}}
						/>
					</Box>
				</DialogContent>

				<DialogActions>
					{hasChanges && (
						<Button
							variant="outlined"
							size="small"
							sx={{
								color: statusColors["available"],
								backgroundColor: statusBgColors["available"],
								borderColor: statusBorderColors["available"],
								borderRadius: ".5rem",
							}}
							onClick={handleSave}
						>
							Salvar
						</Button>
					)}

					<Button
						variant="outlined"
						size="small"
						sx={{
							color: statusColors["common"],
							backgroundColor: statusBgColors["common"],
							borderColor: statusBorderColors["common"],
							borderRadius: ".5rem",
						}}
						onClick={closePersonDialog}
					>
						Fechar
					</Button>
				</DialogActions>
			</>
		</Dialog>
	);
}
