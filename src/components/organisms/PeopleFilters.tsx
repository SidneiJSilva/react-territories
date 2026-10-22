import { Box, Button, Divider } from "@mui/material";

import {
	statusColors,
	statusBgColors,
	statusBorderColors,
} from "@/constants/colors";
import {
	peopleFilterActiveButtons,
	peopleFilterOtherButtons,
} from "@/constants/filters";
import { filtersStore } from "@/stores/filtersStore";
import { useFilters } from "@/hooks";

export default function PeopleFilters() {
	const { filterActive, filterOther, setFilterActive, setFilterOther } =
		filtersStore();
	const { applyPeoplePageFilter } = useFilters();

	return (
		<Box
			sx={{
				display: "flex",
				gap: 2,
				padding: 1,
				backgroundColor: "#fff",
				borderRadius: "1rem",
			}}
		>
			<Box sx={{ display: "flex", gap: 1 }}>
				{peopleFilterActiveButtons.map((button) => (
					<Button
						variant="outlined"
						size="small"
						sx={{
							color:
								statusColors[
									button.value === filterActive ? "delayed_soon" : "common"
								],
							backgroundColor:
								statusBgColors[
									button.value === filterActive ? "delayed_soon" : "common"
								],
							borderColor:
								statusBorderColors[
									button.value === filterActive ? "delayed_soon" : "common"
								],
							borderRadius: ".5rem",
						}}
						onClick={() => {
							setFilterActive(button.value);
							applyPeoplePageFilter(button.value, filterOther);
						}}
					>
						{button.label}
					</Button>
				))}
			</Box>

			<Divider orientation="vertical" variant="fullWidth" flexItem />

			<Box sx={{ display: "flex", gap: 1 }}>
				{peopleFilterOtherButtons.map((button) => (
					<Button
						variant="outlined"
						size="small"
						sx={{
							color:
								statusColors[
									filterOther.includes(button.value) ? "delayed_soon" : "common"
								],
							backgroundColor:
								statusBgColors[
									filterOther.includes(button.value) ? "delayed_soon" : "common"
								],
							borderColor:
								statusBorderColors[
									filterOther.includes(button.value) ? "delayed_soon" : "common"
								],
							borderRadius: ".5rem",
						}}
						onClick={() => {
							let newValue: string[];

							if (button.value === "all") {
								newValue = ["all"];
							} else {
								newValue = filterOther.filter((item: string) => item !== "all");

								if (filterOther.includes(button.value)) {
									newValue = newValue.filter((item) => item !== button.value);
								} else {
									newValue = [...newValue, button.value];
								}
							}

							setFilterOther(newValue);
							applyPeoplePageFilter(filterActive, newValue);
						}}
					>
						{button.label}
					</Button>
				))}
			</Box>
		</Box>
	);
}
