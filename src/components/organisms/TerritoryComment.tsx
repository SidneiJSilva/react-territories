import type { TerritoryDetails } from "@/interfaces/territories";
import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useTerritories } from "@/hooks";

export default function TerritoryComment({ data }: { data: TerritoryDetails }) {
	const [comment, setComment] = useState(data.comment || "");
	const { updateTerritoryComment } = useTerritories();

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<TextField
				label="Comentário"
				multiline
				minRows={3}
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			/>

			<Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
				<Button
					variant="contained"
					color="error"
					onClick={() => {
						setComment("");
						updateTerritoryComment(data.id, "");
					}}
				>
					Remover
				</Button>

				<Button
					variant="contained"
					color="success"
					onClick={() => updateTerritoryComment(data.id, comment)}
				>
					Salvar Comentário
				</Button>
			</Box>
		</Box>
	);
}
