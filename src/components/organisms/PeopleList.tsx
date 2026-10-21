import Box from "@mui/material/Box";
import PeopleListItem from "./PeopleListItem";

import { peopleStore } from "@/stores/peopleStore";

export default function PeopleList() {
	const { peopleList } = peopleStore();

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: {
					xs: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
				},
				gap: "1rem",
			}}
		>
			{peopleList.map((person) => (
				<PeopleListItem person={person} />
			))}
		</Box>
	);
}
