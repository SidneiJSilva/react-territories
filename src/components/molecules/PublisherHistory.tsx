import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

import { territoriesStore } from "@/stores/territoriesStore";
import { filtersStore } from "@/stores/filtersStore";
import { statusColors } from "@/constants/colors";
import { format } from "date-fns";

const headerData = [
	{ label: "Nº", width: "10%" },
	{ label: "Área", width: "30%" },
	{ label: "Atribuído", width: "20%" },
	{ label: "Finalizado", width: "20%" },
];

export function PublisherHistory() {
	const { personTerritories, isLoading } = territoriesStore();
	const { personId } = filtersStore();

	if (!personId) {
		return null;
	}

	return (
		<div>
			<Box sx={{ display: "flex", gap: 1, color: statusColors.assigned }}>
				<HistoryIcon />

				<Typography variant="body1" fontWeight={700}>
					Histórico
				</Typography>
			</Box>

			<Box sx={{ marginTop: "1rem" }}>
				{isLoading ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							padding: "2rem",
						}}
					>
						<CircularProgress size={40} />
					</Box>
				) : personTerritories.length === 0 ? (
					<Typography variant="body2" color="textSecondary">
						Nenhum histórico de atribuições encontrado.
					</Typography>
				) : (
					<TableContainer component={Paper} elevation={0}>
						<Table size="small" aria-label="assignment history">
							<TableHead>
								<TableRow>
									{headerData.map((header) => (
										<TableCell key={header.label} sx={{ width: header.width }}>
											<Typography variant="caption" fontWeight={700}>
												{header.label}
											</Typography>
										</TableCell>
									))}

									{/* <TableCell align="center" sx={{ width: "20%" }}>
										<Typography variant="caption" fontWeight={700}>
											Ações
										</Typography>
									</TableCell> */}
								</TableRow>
							</TableHead>

							<TableBody>
								{personTerritories.map((assignment) => (
									<TableRow key={assignment.id}>
										<TableCell>
											<Typography variant="body2">
												{assignment.territoryId}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography variant="body2">
												{assignment.territoryArea}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography variant="body2">
												{assignment.assignedAt
													? format(
															new Date(assignment.assignedAt),
															"dd/MM/yyyy",
														)
													: "-"}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography variant="body2">
												{assignment.returnedAt
													? format(
															new Date(assignment.returnedAt),
															"dd/MM/yyyy",
														)
													: "-"}
											</Typography>
										</TableCell>

										{/* <TableCell align="center">
											<IconButton
												aria-label="delete"
												color="error"
												size="small"
											>
												<DeleteIcon />
											</IconButton>
										</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Box>
		</div>
	);
}
