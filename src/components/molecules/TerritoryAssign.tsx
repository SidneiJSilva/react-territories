import type { TerritoryDetails } from "@/interfaces";
import { Box, Typography, Button } from "@mui/material";
import { statusColors } from "@/constants/colors";
import { Person } from "@mui/icons-material";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { peopleStore } from "@/stores/peopleStore";
import { useTerritories } from "@/hooks";

export default function TerritoryAssign({ data }: { data: TerritoryDetails }) {
	const [peopleId, setPeopleId] = useState("");
	const { people } = peopleStore();
	const { assignTerritory } = useTerritories();

	const handleChange = (event: SelectChangeEvent) => {
		setPeopleId(event.target.value as string);
	};

	const handleOnClick = async () => {
		await assignTerritory(data.id, parseInt(peopleId));
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
					color: statusColors.assigned,
				}}
			>
				<Person />

				<Typography variant="body1" fontWeight={700}>
					Atribuir
				</Typography>
			</Box>

			<Box sx={{ minWidth: 120 }}>
				<FormControl fullWidth size="small">
					<InputLabel id="demo-simple-select-label">Publicador</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={peopleId}
						label="Age"
						onChange={handleChange}
					>
						{people.map((person) => (
							<MenuItem value={person.peopleid}>{person.fullname}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>

			<Button variant="contained" disabled={!peopleId} onClick={handleOnClick}>
				Confirmar
			</Button>
		</Box>
	);
}
