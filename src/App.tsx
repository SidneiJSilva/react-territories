import { type ReactNode } from "react";
import { Box } from "@mui/material";
import { configureApi } from "@/services/api-service";
import TerritoryDialog from "./components/organisms/TerritoryDialog";
import "./App.css";
import "leaflet/dist/leaflet.css";

type AppProps = {
	children: ReactNode;
	getToken?: () => Promise<string | null>;
};

function App({ children, getToken }: AppProps) {
	if (getToken) {
		configureApi(getToken);
	}

	return (
		<Box
			component="main"
			className="app-container"
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			{children}
			<TerritoryDialog />
		</Box>
	);
}

export default App;
