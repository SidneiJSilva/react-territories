import { type SelectChangeEvent } from "@mui/material/Select";
import { Box, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";

import { peopleStore } from "@/stores/peopleStore";
import { territoriesStore } from "@/stores/territoriesStore";
import { statusIcons } from "@/constants/statusIcons";
import { pt } from "@/constants/lang";
import { useFilters } from "@/hooks";
import { filtersStore } from "@/stores/filtersStore";
import { isMobileScreen } from "@/utils/screenSize";
import Map from "@mui/icons-material/Map";
import type { TerritoryInterface } from "@/interfaces";

export default function Filters() {
	const { people } = peopleStore();
	const { territories } = territoriesStore();
	const { applyStatusFilter, applyPeopleFilter } = useFilters();
	const { personId, status, setPersonId, setStatus } = filtersStore();

	const handlePeopleOnChange = (event: SelectChangeEvent) => {
		setPersonId(event.target.value);
		setStatus("");

		applyPeopleFilter(parseInt(event.target.value));
	};

	const handleStatusOnChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value);
		setPersonId("");

		applyStatusFilter(event.target.value);
	};

	const getTerritory = (peopleid: number) => {
		const territory = territories.find(
			(t) => t.peopleid === peopleid && !t.returnedat,
		);

		return {
			territory: territory as TerritoryInterface,
			hasTerritory: !!territory,
		};
	};

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
			{/* PUBLICADOR */}
			<Box sx={{ width: 200 }}>
				<FormControl fullWidth size="small">
					<InputLabel id="select-publisher-label" shrink>
						Publicador
					</InputLabel>

					<Select
						labelId="select-publisher-label"
						id="select-publisher"
						value={personId}
						label="Publicador"
						onChange={handlePeopleOnChange}
						displayEmpty
					>
						<MenuItem value="">Todos</MenuItem>

						{people
							.filter((person) => person.active)
							.map((person) => (
								<MenuItem key={person.peopleid} value={person.peopleid}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											width: "100%",
										}}
									>
										<div>
											<span>{person.fullname}</span>
										</div>

										{getTerritory(person.peopleid).hasTerritory && (
											<Map
												sx={{
													color:
														statusIcons[
															getTerritory(person.peopleid).territory.status
														].color,
												}}
												fontSize="small"
											/>
										)}
									</Box>
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Box>
			{/* STATUS */}
			{isMobileScreen() ? null : (
				<Box sx={{ width: 200 }}>
					<FormControl fullWidth size="small">
						<InputLabel id="select-status-label" shrink>
							Status
						</InputLabel>
						<Select
							labelId="select-status-label"
							id="select-status"
							value={status}
							label="Status"
							onChange={handleStatusOnChange}
							displayEmpty
						>
							<MenuItem value="">Todos</MenuItem>
							<MenuItem value="no_synced">
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: "0.25rem",
										color: "red",
										fontSize: ".9rem",
									}}
								>
									<CloudOutlinedIcon />
									Não sincronizado
								</Box>
							</MenuItem>

							{Object.keys(statusIcons).map((statusKey) => (
								<MenuItem key={statusKey} value={statusKey}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: "0.25rem",
											color: statusIcons[statusKey].color,
											fontSize: ".9rem",
										}}
									>
										{statusIcons[statusKey].icon}

										{pt.status[statusKey as keyof typeof pt.status]}
									</Box>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			)}
		</Box>
	);
}
