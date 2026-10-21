import Box from "@mui/material/Box";
import PeopleFilters from "@/components/organisms/PeopleFilters";
import PeopleList from "@/components/organisms/PeopleList";

import { useFilters } from "@/hooks";
import { filtersStore } from "@/stores/filtersStore";
import { useEffect } from "react";

export default function People() {
	const { applyPeoplePageFilter } = useFilters();
	const { filterActive, filterOther } = filtersStore();

	useEffect(() => {
		applyPeoplePageFilter(filterActive, filterOther);
	}, [filterActive, filterOther]);

	return (
		<Box
			sx={{
				flex: 1,
				overflowY: "auto",
				backgroundColor: "#f0f0f0",
				padding: 2,
			}}
		>
			<Box sx={{ marginBottom: 2 }}>
				<PeopleFilters />
			</Box>

			<PeopleList />
		</Box>
	);
}
