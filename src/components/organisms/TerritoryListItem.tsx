import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import SCard from "@/components/atoms/cards/SCard";
import { TerritoryHeader } from "@/components/molecules/TerritoryHeader";
import { TerritoryFooter } from "@/components/molecules/TerritoryFooter";

import { type TerritoryInterface } from "@/interfaces";
import { statusColors } from "@/constants/colors";
import { useTerritories } from "@/hooks";

export default function TerritoryListItem({
	territory,
	from,
}: {
	territory: TerritoryInterface;
	from: "list" | "group";
}) {
	const isDarkText = territory.status === "delayed_soon";

	const { fetchTerritoryDetails } = useTerritories();

	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);
		try {
			await fetchTerritoryDetails(territory.id);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SCard
			sx={{
				position: "relative", // para o loading absoluto funcionar
				flex: {
					xs: "1 1 100%",
					sm: "1 1 calc(50% - 0.5rem)",
				},
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: ".5rem",
				boxSizing: "border-box",
				color: isDarkText ? "#000" : "#fff",
				backgroundColor: territory.status
					? statusColors[territory.status]
					: "#fff",
				borderRadius: "1rem",
				cursor: "pointer",
				userSelect: "none", // evita seleção durante loading
			}}
			onClick={handleClick}
		>
			{isLoading && (
				<Box
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						bgcolor: "rgba(255,255,255,0.6)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: "1rem",
						zIndex: 10,
					}}
				>
					<CircularProgress size={40} />
				</Box>
			)}

			{/* Conteúdo normal do card */}
			<>
				<TerritoryHeader
					firstname={territory.firstname ?? undefined}
					lastname={territory.lastname ?? undefined}
					synced={territory.synced}
					status={territory.status}
				/>

				<TerritoryFooter
					status={territory.status}
					delayedbydays={territory.delayedbydays ?? undefined}
					daystodelay={territory.daystodelay ?? undefined}
					number={territory.number}
					link={territory.link ?? undefined}
					isDarkText={isDarkText}
					territoryarea={from === "list" ? territory.territoryarea : ""}
				/>
			</>
		</SCard>
	);
}
