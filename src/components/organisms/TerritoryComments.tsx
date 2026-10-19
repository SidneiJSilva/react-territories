import {
	Box,
	Button,
	IconButton,
	TextField,
	Typography,
	Collapse,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent, {
	timelineContentClasses,
} from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { format } from "date-fns";

import { useState } from "react";
import { useTerritories } from "@/hooks";
import { detailTextColors, cardColors } from "@/constants/colors";

type TerritoryComment = {
	id: number | string;
	territoryId: number | string;
	comment: string;
	createdAt: string;
};

type TerritoryCommentsProps = {
	territoryId: number;
	onDelete?: (id: number, type: "history" | "comments") => void;
	comments: TerritoryComment[];
	isDeleting?: boolean;
};

export default function TerritoryComments({
	territoryId,
	onDelete,
	comments,
	isDeleting,
}: TerritoryCommentsProps) {
	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const { addTerritoryComment } = useTerritories();

	const handleAddComment = async () => {
		const trimmedComment = comment.trim();

		if (!trimmedComment || isSubmitting) return;

		setIsSubmitting(true);

		try {
			await addTerritoryComment(territoryId, trimmedComment);
			setComment("");
		} catch (error) {
			console.error("Failed to add territory comment:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const commentsComponent = (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			{comments?.length > 0 && (
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
					{comments.map((comment) => (
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot sx={{ backgroundColor: "#C2415D" }} />
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
										<Typography variant="body2">{comment.comment}</Typography>
										<Typography
											variant="caption"
											color={detailTextColors.tertiary}
										>
											{format(new Date(comment.createdAt), "dd/MM/yyyy")}
										</Typography>
									</Box>

									<IconButton
										disabled={isDeleting}
										aria-label="delete"
										color="error"
										size="small"
										onClick={() => onDelete?.(Number(comment.id), "comments")}
									>
										<DeleteOutlineIcon fontSize="small" />
									</IconButton>
								</Box>
							</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			)}

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 1,
					marginTop: comments.length ? null : 2,
				}}
			>
				<TextField
					label="Novo comentário"
					multiline
					minRows={3}
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					disabled={isSubmitting || isDeleting}
					sx={{
						"& .MuiOutlinedInput-root": {
							bgcolor: cardColors.purple.surface,
							borderRadius: 3,

							"& fieldset": {
								borderColor: cardColors.purple.border,
							},

							"&:hover fieldset": {
								borderColor: cardColors.purple.primary,
							},

							"&.Mui-focused fieldset": {
								borderColor: cardColors.purple.primary,
							},
						},

						"& .MuiInputLabel-root.Mui-focused": {
							color: cardColors.purple.primary,
						},
					}}
				/>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
				<Button
					variant="contained"
					disabled={!comment.trim() || isSubmitting || isDeleting}
					onClick={handleAddComment}
					startIcon={<AddIcon />}
					sx={{
						width: "100%",
						borderRadius: "1rem",
						backgroundColor: cardColors.purple.primary,
						color: "#fff",
						fontSize: "1rem",
						fontWeight: 600,
						textTransform: "none",
						boxShadow: "0 4px 8px #8064a285",

						"&:hover": {
							backgroundColor: cardColors.purple.buttonHover,
							boxShadow: "0 6px 12px #8064a24e",
						},

						"&.Mui-disabled": {
							backgroundColor: "#d9d6e0",
							color: "#9f9ba5",
							boxShadow: "none",
						},
					}}
				>
					Adicionar
				</Button>
			</Box>
		</Box>
	);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				padding: 2,
				borderRadius: "2rem",
				border: "1px solid",
				backgroundColor: cardColors.purple.background,
				borderColor: cardColors.purple.border,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							padding: "0.5rem",
							borderRadius: ".5rem",
							backgroundColor: cardColors.purple.primary,
							color: "#fff",
						}}
					>
						<MessageIcon />
					</Box>

					<Box>
						<Typography variant="body1" fontWeight={700} lineHeight={1.2}>
							Comentários
						</Typography>

						<Typography
							variant="caption"
							color={detailTextColors.tertiary}
							lineHeight={1.2}
						>
							{comments.length
								? `${comments.length} para este território`
								: "Ainda não existem para este território"}
						</Typography>
					</Box>
				</Box>

				<IconButton
					size="small"
					aria-label="Eliminar comentário"
					disabled={isDeleting || isSubmitting}
					onClick={() => setExpanded(!expanded)}
					sx={{ color: cardColors.purple.primary }}
				>
					{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</IconButton>
			</Box>

			<Collapse in={expanded}>{commentsComponent}</Collapse>
		</Box>
	);
}
