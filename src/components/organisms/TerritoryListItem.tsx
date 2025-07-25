import SCard from "@/components/atoms/cards/SCard";
import { TerritoryHeader } from "@/components/molecules/TerritoryHeader";
import { TerritoryFooter } from "@/components/molecules/TerritoryFooter";

import { type TerritoryInterface } from "@/interfaces";
import { statusColors } from "@/constants/colors";
import { useTerritories } from "@/hooks";

export default function TerritoryListItem({
	territory,
}: {
	territory: TerritoryInterface;
}) {
	const isDarkText = territory.status === "delayed_soon";

	const { fetchTerritoryDetails } = useTerritories();

	const handleClick = async () => {
		await fetchTerritoryDetails(territory.id);
	};

	return (
		<SCard
			sx={{
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
			}}
		>
			<div onClick={handleClick} style={{ cursor: "pointer" }}>
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
				/>
			</div>
		</SCard>
	);
}
