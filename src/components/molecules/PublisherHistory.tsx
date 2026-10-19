import Typography from "@mui/material/Typography";
import HistoryIcon from "@mui/icons-material/History";
import CircularProgress from "@mui/material/CircularProgress";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent, {
	timelineContentClasses,
} from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box } from "@mui/material";

import { territoriesStore } from "@/stores/territoriesStore";
import { filtersStore } from "@/stores/filtersStore";
import { detailTextColors, cardColors } from "@/constants/colors";
import { format } from "date-fns";

export function PublisherHistory() {
	const { personTerritories, isLoading } = territoriesStore();
	const { personId } = filtersStore();

	if (!personId) {
		return null;
	}

	return (
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
				<Typography variant="body2" color={detailTextColors.secondary}>
					Nenhum histórico de atribuições encontrado.
				</Typography>
			) : (
				<div>
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
									{personTerritories.length} registros
								</Typography>
							</Box>
						</Box>

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
							{personTerritories.map((territory) => (
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
													{territory.territoryId} {territory.territoryArea}
												</Typography>
												<Typography
													variant="caption"
													color={detailTextColors.tertiary}
												>
													{`${territory.assignedAt ? format(new Date(territory.assignedAt), "dd/MM/yyyy") : "-"} - ${territory.returnedAt ? format(new Date(territory.returnedAt), "dd/MM/yyyy") : ""}`}
												</Typography>
											</Box>
										</Box>
									</TimelineContent>
								</TimelineItem>
							))}
						</Timeline>
					</Box>
				</div>
			)}
		</Box>
	);
}
