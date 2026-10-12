import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	CircularProgress,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { useTerritories } from "@/hooks";

type TerritoryComment = {
	id: number | string;
	territoryId: number | string;
	comment: string;
	createdAt: string;
};

type TerritoryCommentsProps = {
	territoryId: number;
	comments: TerritoryComment[];
};

export default function TerritoryComments({
	territoryId,
	comments,
}: TerritoryCommentsProps) {
	const [comment, setComment] = useState("");
	const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const { addTerritoryComment, deleteTerritoryComment } = useTerritories();

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

	const handleDeleteComment = async (commentId: number) => {
		if (isDeleting) return;

		setIsDeleting(true);

		try {
			await deleteTerritoryComment(territoryId, commentId);
			setCommentToDelete(null);
		} catch (error) {
			console.error("Failed to delete territory comment:", error);
		} finally {
			setIsDeleting(false);
		}
	};

	const formatDate = (date: string) =>
		new Intl.DateTimeFormat("pt-PT", {
			dateStyle: "short",
			timeStyle: "short",
		}).format(new Date(date));

	return (
		<Accordion defaultExpanded={comments.length > 0}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Comentários ({comments.length})</Typography>
			</AccordionSummary>

			<AccordionDetails>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					{comments.length === 0 ? (
						<Typography variant="body2" color="text.secondary">
							Ainda não existem comentários para este território.
						</Typography>
					) : (
						comments.map((item) => {
							const id = Number(item.id);

							return (
								<Box
									key={item.id}
									sx={{
										p: 1,
										borderRadius: 1,
										bgcolor: "background.default",
										borderBottom: "1px solid",
										borderColor: "divider",
									}}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "flex-start",
											gap: 1,
										}}
									>
										<Typography
											variant="body2"
											sx={{
												whiteSpace: "pre-wrap",
												overflowWrap: "anywhere",
												alignSelf: "center",
											}}
										>
											{item.comment}
										</Typography>

										<IconButton
											size="small"
											color="error"
											aria-label="Eliminar comentário"
											disabled={isDeleting || isSubmitting}
											onClick={() => setCommentToDelete(id)}
										>
											<DeleteOutlineIcon fontSize="small" />
										</IconButton>
									</Box>

									<Typography
										variant="caption"
										color="text.secondary"
										display="block"
									>
										{formatDate(item.createdAt)}
									</Typography>

									{commentToDelete === id && (
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "flex-end",
												gap: 1,
												mt: 1,
											}}
										>
											<Typography variant="caption">
												Eliminar este comentário?
											</Typography>

											<Button
												size="small"
												onClick={() => setCommentToDelete(null)}
												disabled={isDeleting}
											>
												Cancelar
											</Button>

											<Button
												size="small"
												color="error"
												variant="contained"
												disabled={isDeleting}
												onClick={() => handleDeleteComment(id)}
											>
												{isDeleting ? (
													<CircularProgress size={16} color="inherit" />
												) : (
													"Eliminar"
												)}
											</Button>
										</Box>
									)}
								</Box>
							);
						})
					)}

					<Box
						sx={{
							marginTop: 2,
							display: "flex",
							flexDirection: "column",
							gap: 1,
						}}
					>
						<TextField
							label="Novo comentário"
							multiline
							minRows={3}
							value={comment}
							onChange={(event) => setComment(event.target.value)}
							disabled={isSubmitting || isDeleting}
						/>
					</Box>

					<Box
						sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}
					>
						<Button
							variant="contained"
							onClick={handleAddComment}
							disabled={!comment.trim() || isSubmitting || isDeleting}
						>
							{isSubmitting ? (
								<CircularProgress size={20} color="inherit" />
							) : (
								"Adicionar comentário"
							)}
						</Button>
					</Box>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
}
