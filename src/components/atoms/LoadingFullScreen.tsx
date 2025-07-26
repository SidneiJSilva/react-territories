import { Box, CircularProgress } from "@mui/material";

type FullscreenLoaderProps = {
	size?: number;
};

export default function LoadingFullScreen({
	size = 64,
}: FullscreenLoaderProps) {
	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "rgba(255, 255, 255, 0.6)", // leve overlay opcional
				zIndex: 1300, // acima da maioria dos elementos
			}}
		>
			<CircularProgress size={size} />
		</Box>
	);
}
