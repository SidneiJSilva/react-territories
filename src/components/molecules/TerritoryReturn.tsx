import {
	Publish as PublishIcon,
	Check as CheckIcon,
} from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import { statusColors, cardColors, detailTextColors } from "@/constants/colors";
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
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				padding: 2,
				border: "1px solid",
				backgroundColor: cardColors.blue.background,
				borderColor: cardColors.blue.border,
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
						backgroundColor: statusColors.assigned,
						color: "#fff",
					}}
				>
					<PublishIcon />
				</Box>

				<Box>
					<Typography variant="body1" fontWeight={700} lineHeight={1.2}>
						Devolução de território
					</Typography>

					<Typography
						variant="caption"
						color={detailTextColors.tertiary}
						lineHeight={1.2}
					>
						Registrar a data de conclusão
					</Typography>
				</Box>
			</Box>

			<Box sx={{ marginTop: 1 }}>
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
											borderColor: cardColors.blue.border,
											borderWidth: "1.5px",
										},

										"&:hover .MuiPickersOutlinedInput-notchedOutline": {
											borderColor: cardColors.blue.primary,
										},

										"&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
											borderColor: `${cardColors.blue.primary} !important`,
											borderWidth: "2px",
										},
									},

									"& .MuiInputLabel-root": {
										color: "#475569",
									},

									"& .MuiInputLabel-root.Mui-focused": {
										color: cardColors.blue.primary,
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
				startIcon={<CheckIcon />}
				onClick={handleOnClick}
				sx={{
					width: "100%",
					borderRadius: "1rem",
					backgroundColor: cardColors.blue.primary,
					color: "#fff",
					fontSize: "1rem",
					fontWeight: 600,
					textTransform: "none",
					boxShadow: "0 4px 8px rgba(7, 81, 150, 0.2)",

					"&:hover": {
						backgroundColor: cardColors.blue.buttonHover,
						boxShadow: "0 6px 12px rgba(7, 81, 150, 0.25)",
					},

					"&.Mui-disabled": {
						backgroundColor: "#D6E0DC",
						color: "#9BA5A1",
						boxShadow: "none",
					},
				}}
			>
				Devolver
			</Button>
		</Box>
	);
}
