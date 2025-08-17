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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

export default function TerritoryAssign({ data }: { data: TerritoryDetails }) {
	const [peopleId, setPeopleId] = useState("");
	const { people } = peopleStore();
	const { assignTerritory } = useTerritories();
	const [date, setDate] = useState<Dayjs>(dayjs());

	const handleChange = (event: SelectChangeEvent) => {
		setPeopleId(event.target.value as string);
	};

	const handleOnClick = async () => {
		await assignTerritory(data.id, parseInt(peopleId), date.toString());
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					gap: 2,
				}}
			>
				<FormControl fullWidth size="small">
					<InputLabel id="select-publicador-label">Publicador</InputLabel>
					<Select
						labelId="select-publicador-label"
						id="select-publicador"
						value={peopleId}
						label="Publicador"
						onChange={handleChange}
						fullWidth
					>
						{people.map((person) => (
							<MenuItem key={person.peopleid} value={person.peopleid}>
								{person.fullname}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
					<DatePicker
						label="Selecione uma data"
						value={date}
						onChange={(newValue) => setDate(newValue)}
						format="DD/MM/YYYY"
						slotProps={{
							textField: { size: "small", fullWidth: true },
						}}
					/>
				</LocalizationProvider>
			</Box>

			<Button variant="contained" disabled={!peopleId} onClick={handleOnClick}>
				Confirmar
			</Button>
		</Box>
	);
}
