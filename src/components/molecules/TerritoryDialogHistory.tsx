import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent, {
	timelineContentClasses,
} from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import { Box } from "@mui/material";

import { format } from "date-fns";
import { detailTextColors, cardColors } from "@/constants/colors";

type Assignment = {
	assignedAt: string;
	campaign: boolean;
	firstName: string;
	id: number;
	assignmentId: number;
	lastName: string;
	peopleId: number;
	returnedAt: string | null;
};

type Props = {
	assignments: Assignment[];
	onDelete?: (id: number, type: "history" | "comments") => void;
	isDeleting?: boolean;
};

export default function TerritoryDialogHistory({
	assignments,
	onDelete,
	isDeleting,
}: Props) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				paddingTop: 2,
				paddingLeft: 2,
				paddingRight: 2,
				borderRadius: "2rem",
				border: "1px solid",
				backgroundColor: cardColors.gray.background,
				borderColor: cardColors.gray.border,
			}}
		>
			<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						padding: "0.5rem",
						borderRadius: ".5rem",
						backgroundColor: cardColors.gray.primary,
						color: "#fff",
					}}
				>
					<HistoryIcon />
				</Box>

				<Box>
					<Typography variant="body1" fontWeight={700} lineHeight={1.2}>
						Histórico
					</Typography>

					<Typography
						variant="caption"
						color={detailTextColors.tertiary}
						lineHeight={1.2}
					>
						10 mais recentes
					</Typography>
				</Box>
			</Box>

			{assignments?.length ? (
				<Timeline
					sx={{
						[`& .${timelineItemClasses.root}:before`]: {
							flex: 0,
							padding: 0,
						},
						[`& .${timelineContentClasses.root}`]: {
							py: 0.5,
						},
						[`& .${timelineItemClasses.root}`]: {
							minHeight: 0,
						},
					}}
				>
					{assignments.map((assignment) => (
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="warning" />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										borderBottom: "1px solid",
										borderColor: "divider",
										paddingBottom: 1,
									}}
								>
									<Box>
										<Typography variant="body2">
											{assignment.firstName} {assignment.lastName}
										</Typography>
										<Typography
											variant="caption"
											color={detailTextColors.tertiary}
										>
											{`${assignment.assignedAt ? format(new Date(assignment.assignedAt), "dd/MM/yyyy") : "-"} - ${assignment.returnedAt ? format(new Date(assignment.returnedAt), "dd/MM/yyyy") : "-"}`}
										</Typography>
									</Box>

									<IconButton
										disabled={isDeleting}
										aria-label="delete"
										color="error"
										size="small"
										onClick={() =>
											onDelete?.(assignment.assignmentId, "history")
										}
									>
										<DeleteOutlineIcon fontSize="small" />
									</IconButton>
								</Box>
							</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			) : (
				<Box
					sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
				>
					<Typography
						variant="body1"
						fontWeight={700}
						color={detailTextColors.tertiary}
					>
						Sem histórico
					</Typography>
				</Box>
			)}
		</Box>
	);
}
