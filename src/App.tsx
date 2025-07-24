// App.tsx
import { type ReactNode } from "react";
import { Box } from "@mui/material";
import "./App.css";

type AppProps = {
	children: ReactNode;
};

function App({ children }: AppProps) {
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
		</Box>
	);
}

export default App;
