// App.tsx
import type { ReactNode } from "react";
import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from "@mui/material";
import { useDialogStore } from "@/stores/dialogStore";

type AppProps = {
	children: ReactNode;
};

function App({ children }: AppProps) {
	const { open, data, closeDialog } = useDialogStore();

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

			{/* Custom Dialog */}
			<Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
				<DialogTitle>
					{data
						? `${data["territory-area"].label} - ${data["territory-type"].label} - ${data.number}`
						: ""}
				</DialogTitle>
				<DialogContent dividers>
					{data ? (
						<>
							<Typography variant="h6">{data.territoryarea}</Typography>
							<Typography variant="body2" sx={{ mt: 1 }}>
								{/* Exemplo de detalhes */}
								LINK: {data.link || "Sem link"} <br />
							</Typography>
						</>
					) : (
						<Typography>Carregando...</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog}>Fechar</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default App;
