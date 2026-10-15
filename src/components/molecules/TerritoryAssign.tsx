import type { TerritoryDetails } from "@/interfaces";
import { Box, Typography, Button } from "@mui/material";
import {
	statusColors,
	// statusBgColors,
	// statusBorderColors,
	detailTextColors,
	cardColors,
} from "@/constants/colors";
import {
	PersonAddAlt as PersonAddAltIcon,
	Check as CheckIcon,
} from "@mui/icons-material";
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
	const [date, setDate] = useState<Dayjs | null>(dayjs());

	const handleChange = (event: SelectChangeEvent) => {
		setPeopleId(event.target.value as string);
	};

	const handleOnClick = async () => {
		if (!date) return;
		await assignTerritory(data.id, parseInt(peopleId), date.toString());
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				padding: 2,
				border: "2px solid",
				backgroundColor: cardColors.background,
				borderColor: cardColors.border,
				borderRadius: "2rem",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 1,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						padding: "0.5rem",
						borderRadius: ".5rem",
						backgroundColor: statusColors.available,
						color: "#fff",
					}}
				>
					<PersonAddAltIcon />
				</Box>

				<Box>
					<Typography variant="body1" fontWeight={700} lineHeight={1.2}>
						Atribuir território
					</Typography>

					<Typography
						variant="caption"
						color={detailTextColors.tertiary}
						lineHeight={1.2}
					>
						Designar novo publicador responsável
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					gap: 2,
					marginTop: 1,
				}}
			>
				<FormControl
					fullWidth
					size="small"
					sx={{
						"& .MuiOutlinedInput-root": {
							backgroundColor: "#fff",
							borderRadius: "1.25rem",

							"& .MuiOutlinedInput-notchedOutline": {
								borderColor: cardColors.border,
								borderWidth: "1.5px",
							},

							"&:hover .MuiOutlinedInput-notchedOutline": {
								borderColor: cardColors.primary,
							},

							"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
								borderColor: cardColors.primary,
								borderWidth: "2px",
							},
						},

						"& .MuiInputLabel-root": {
							color: "#475569",
						},

						"& .MuiInputLabel-root.Mui-focused": {
							color: cardColors.primary,
						},

						"& .MuiSelect-select": {
							display: "flex",
							alignItems: "center",
						},

						"& .MuiSelect-icon": {
							color: "#64748b",
							right: "1rem",
						},
					}}
				>
					<InputLabel id="select-publicador-label">Publicador</InputLabel>

					<Select
						labelId="select-publicador-label"
						id="select-publicador"
						value={peopleId}
						label="Publicador"
						onChange={handleChange}
						MenuProps={{
							PaperProps: {
								sx: {
									mt: 1,
									borderRadius: "1rem",
									border: `1px solid ${cardColors.border}`,
									boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",

									"& .MuiMenuItem-root": {
										borderRadius: "0.5rem",
										mx: 0.5,
										my: 0.25,
									},

									"& .MuiMenuItem-root.Mui-selected": {
										backgroundColor: cardColors.surfaceHover,
									},

									"& .MuiMenuItem-root.Mui-selected:hover": {
										backgroundColor: cardColors.border,
									},
								},
							},
						}}
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
						label="Data de atribuição"
						value={date}
						onChange={(newValue) => setDate(newValue)}
						format="DD/MM/YYYY"
						maxDate={dayjs()}
						slotProps={{
							textField: {
								size: "small",
								fullWidth: true,
								sx: {
									"& .MuiPickersOutlinedInput-root": {
										borderRadius: "1.25rem",
										backgroundColor: "#fff",

										"& .MuiPickersOutlinedInput-notchedOutline": {
											borderColor: cardColors.border,
											borderWidth: "1.5px",
										},

										"&:hover .MuiPickersOutlinedInput-notchedOutline": {
											borderColor: cardColors.primary,
										},

										"&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
											borderColor: `${cardColors.primary} !important`,
											borderWidth: "2px",
										},
									},

									"& .MuiInputLabel-root": {
										color: "#475569",
									},

									"& .MuiInputLabel-root.Mui-focused": {
										color: cardColors.primary,
									},

									"& .MuiIconButton-root": {
										color: "#64748b",
									},
								},
							},
						}}
					/>
				</LocalizationProvider>
			</Box>

			<Button
				variant="contained"
				disabled={!peopleId}
				onClick={handleOnClick}
				startIcon={<CheckIcon />}
				sx={{
					width: "100%",
					borderRadius: "1rem",
					backgroundColor: cardColors.primary,
					color: "#fff",
					fontSize: "1rem",
					fontWeight: 600,
					textTransform: "none",
					boxShadow: "0 4px 8px rgba(7, 150, 105, 0.2)",

					"&:hover": {
						backgroundColor: "#067F59",
						boxShadow: "0 6px 12px rgba(7, 150, 105, 0.25)",
					},

					"&.Mui-disabled": {
						backgroundColor: "#D6E0DC",
						color: "#9BA5A1",
						boxShadow: "none",
					},
				}}
			>
				Confirmar
			</Button>
		</Box>
	);
}
