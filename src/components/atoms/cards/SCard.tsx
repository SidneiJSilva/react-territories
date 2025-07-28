import {
	Card,
	CardContent,
	CardHeader,
	type SxProps,
	Typography,
} from "@mui/material";
import { type ReactNode } from "react";

interface SCardProps {
	title?: string;
	children: ReactNode;
	sx?: SxProps;
	onClick?: () => void;
}

export default function SCard({ title, children, sx, onClick }: SCardProps) {
	return (
		<Card
			onClick={onClick}
			elevation={3}
			sx={{
				borderRadius: 2,
				backgroundColor: "#fff",
				boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
				...sx,
			}}
		>
			{title && (
				<CardHeader
					title={
						<Typography variant="h6" component="div">
							{title}
						</Typography>
					}
					sx={{ paddingBottom: 0, paddingX: 1, paddingTop: 1 }}
				/>
			)}
			<CardContent
				sx={{
					paddingTop: 1,
					paddingBottom: "8px !important", // sobrescreve padding-bottom do MUI
					paddingX: 1,
					"&:last-child": {
						paddingBottom: "8px", // remove padding extra do MUI
					},
				}}
			>
				{children}
			</CardContent>
		</Card>
	);
}
