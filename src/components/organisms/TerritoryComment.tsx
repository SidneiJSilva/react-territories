import type { TerritoryDetails } from "@/interfaces/territories";
import {
	Box,
	TextField,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useTerritories } from "@/hooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TerritoryComment({ data }: { data: TerritoryDetails }) {
	const [comment, setComment] = useState(data.comment || "");
	const { updateTerritoryComment } = useTerritories();

	return (
		<Accordion defaultExpanded={!!comment} sx={{ backgroundColor: "#f0f0f0" }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header"
			>
				<Typography component="span">Comentário</Typography>
			</AccordionSummary>

			<AccordionDetails>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						backgroundColor: "white",
						borderRadius: 1,
						marginBottom: 2,
					}}
				>
					<TextField
						label="Escrever comentário"
						multiline
						minRows={3}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</Box>

				<Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
					<Button
						variant="contained"
						color="warning"
						onClick={() => {
							setComment("");
							updateTerritoryComment(data.id, "");
						}}
					>
						Remover
					</Button>

					<Button
						variant="contained"
						color="info"
						onClick={() => updateTerritoryComment(data.id, comment)}
					>
						Salvar Comentário
					</Button>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
}
