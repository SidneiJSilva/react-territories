import Navigation from "@/components/molecules/Navigation";
import Filters from "@/components/molecules/Filters";
import { Box } from "@mui/material";
import { navigationStore } from "@/stores/navigationStore";

export default function Header() {
	const { actualPage } = navigationStore();

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
			<Navigation />

			{actualPage === "list" && <Filters />}
		</Box>
	);
}
