import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Typography, Button } from "@mui/material";
import { statusColors } from "@/constants/colors";
import type { TerritoryDetails } from "@/interfaces";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import { useTerritories } from "@/hooks";
import { useState } from "react";

export default function TerritoryReturn({ data }: { data: TerritoryDetails }) {
	const { returnTerritory } = useTerritories();
	const [date, setDate] = useState<Dayjs | null>(dayjs());

	const handleOnClick = async () => {
		await returnTerritory(data.assignmentid, data.id, date?.toString() || "");
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
				<ReplayIcon />

				<Typography variant="body1" fontWeight={700}>
					Devolução
				</Typography>
			</Box>

			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
				<DatePicker
					label="Data de devolução"
					value={date}
					onChange={(newValue) => setDate(newValue)}
					format="DD/MM/YYYY"
					maxDate={dayjs()}
					slotProps={{
						textField: { size: "small", fullWidth: true },
					}}
				/>
			</LocalizationProvider>

			<Button variant="contained" onClick={handleOnClick}>
				Devolver
			</Button>
		</Box>
	);
}
