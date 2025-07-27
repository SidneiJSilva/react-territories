// src/components/molecules/TerritoryDialogHistory.tsx
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";
import { Box } from "@mui/material";

import { format } from "date-fns";
import { statusColors } from "@/constants/colors";

type Assignment = {
	assignedAt: string;
	campaign: boolean;
	firstName: string;
	id: number;
	lastName: string;
	peopleId: number;
	returnedAt: string | null;
};

type Props = {
	assignments: Assignment[];
};

const headerData = [
	{ label: "Nome", width: "50%" },
	{ label: "Atribuído", width: "25%" },
	{ label: "Finalizado", width: "25%" },
];

export default function TerritoryDialogHistory({ assignments }: Props) {
	return (
		<div>
			<Box sx={{ display: "flex", gap: 1, color: statusColors.assigned }}>
				<HistoryIcon />

				<Typography variant="body1" fontWeight={700}>
					Histórico
				</Typography>
			</Box>

			{assignments ? (
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
							</TableRow>
						</TableHead>

						<TableBody>
							{assignments.map((assignment) => (
								<TableRow key={assignment.id}>
									<TableCell>
										<Typography variant="body2">
											{assignment.firstName} {assignment.lastName}
										</Typography>
									</TableCell>

									<TableCell>
										<Typography variant="body2">
											{assignment.assignedAt
												? format(new Date(assignment.assignedAt), "dd/MM/yyyy")
												: "-"}
										</Typography>
									</TableCell>

									<TableCell>
										<Typography variant="body2">
											{assignment.returnedAt
												? format(new Date(assignment.returnedAt), "dd/MM/yyyy")
												: "-"}
										</Typography>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Box
					sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
				>
					<Typography variant="body1" fontWeight={700}>
						Sem histórico
					</Typography>
				</Box>
			)}
		</div>
	);
}
