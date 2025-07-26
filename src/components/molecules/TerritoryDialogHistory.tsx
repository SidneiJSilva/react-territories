import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

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
	);
}
