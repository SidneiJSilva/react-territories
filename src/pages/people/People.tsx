import Box from "@mui/material/Box";
import PeopleFilters from "@/components/organisms/PeopleFilters";
import PeopleList from "@/components/organisms/PeopleList";

export default function People() {
	return (
		<Box
			sx={{
				flex: 1,
				overflowY: "auto",
				backgroundColor: "#f0f0f0",
				padding: 2,
			}}
		>
			<PeopleFilters />

			<PeopleList />
		</Box>
	);
}
