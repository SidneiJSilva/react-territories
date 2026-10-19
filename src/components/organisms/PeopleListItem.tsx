import SCard from "@/components/atoms/cards/SCard";
import {
	Box,
	// Stack,
	// Button,
	// CircularProgress,
	FormControlLabel,
	Switch,
	Typography,
} from "@mui/material";

import { cardColors } from "@/constants/colors";
import type { PeopleInterface } from "@/interfaces";
import { useState } from "react";

export default function PeopleListItem({
	person,
}: {
	person: PeopleInterface;
}) {
	const genderColors =
		person.gender === "male" ? cardColors.male : cardColors.female;
	const [active, setActive] = useState(person.active);

	const handleClick = () => {
		console.log(person);
	};

	const initials = () => {
		return `${person.firstname[0]}${person.lastname[0]}`;
	};

	const handleActive = (act: boolean) => {
		setActive(act);
		console.log(act);
	};

	return (
		<SCard
			sx={{
				position: "relative",
				flex: {
					xs: "1 1 100%",
					sm: "1 1 calc(50% - 0.5rem)",
				},
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: ".5rem",
				boxSizing: "border-box",
				borderRadius: ".5rem",
				borderLeft: "8px solid",
				borderColor: person.gender
					? cardColors[person.gender as keyof typeof cardColors].border
					: cardColors.gray.border,
				cursor: "pointer",
				userSelect: "none",
			}}
			onClick={handleClick}
		>
			<Box
				sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}
			>
				<Box
					sx={{
						width: "2rem",
						borderRadius: ".5rem",
						backgroundColor: person.gender
							? cardColors[person.gender as keyof typeof cardColors].primary
							: cardColors.gray.primary,
						textAlign: "center",
					}}
				>
					<Typography
						variant="body1"
						component="span"
						sx={{ color: "#fff", fontWeight: "bold" }}
					>
						{initials()}
					</Typography>
				</Box>

				<Typography variant="h6" component="span">
					{person.fullname}
				</Typography>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					borderTop: "1px solid #f0f0f0",
					paddingTop: 1,
				}}
			>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
					<FormControlLabel
						control={
							<Switch
								checked={active}
								onChange={(_, checked) => handleActive(checked)}
								sx={{
									"& .MuiSwitch-switchBase": {
										"&.Mui-checked": {
											color: genderColors.primary,

											"& + .MuiSwitch-track": {
												backgroundColor: genderColors.background,
												opacity: 1,
											},
										},

										"&:not(.Mui-checked)": {
											color: "#fff",
										},
									},

									"& .MuiSwitch-thumb": {
										backgroundColor: "#fff",
									},

									"& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
										backgroundColor: genderColors.primary,
									},

									"& .MuiSwitch-track": {
										backgroundColor: genderColors.background,
										opacity: 1,
									},
								}}
							/>
						}
						label="Active"
					/>
					<div>P. REGULAR</div>
				</Box>

				<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
					<div>TECH SKILLS</div>
					<div>TP APP.</div>
				</Box>
			</Box>
		</SCard>
	);
}
