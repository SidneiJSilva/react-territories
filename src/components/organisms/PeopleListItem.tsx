import SCard from "@/components/atoms/cards/SCard";
import {
	Box,
	// Stack,
	// Button,
	// CircularProgress,
	IconButton,
	FormControlLabel,
	Switch,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { cardColors } from "@/constants/colors";
import type { PeopleInterface } from "@/interfaces";
import { useState } from "react";
import { useDialogStore } from "@/stores/dialogStore";

export default function PeopleListItem({
	person,
}: {
	person: PeopleInterface;
}) {
	const { openPersonDialog } = useDialogStore();
	const genderColors =
		person.gender === "male" ? cardColors.male : cardColors.female;
	const [active, setActive] = useState(person.active);
	const [regularPioneer, setRegularPioneer] = useState(person.regularpionner);
	const [techSkills, setTechSkills] = useState(person.techskills);
	const [tpApproved, setTpApproved] = useState(person.tpapproved);

	const handleClick = () => {
		openPersonDialog(person);
	};

	const initials = () => {
		return `${person.firstname[0]}${person.lastname[0]}`;
	};

	const handleActive = (act: boolean) => {
		setActive(act);
		console.log(act);
	};

	const handleRegularPioneer = (regPio: boolean) => {
		setRegularPioneer(regPio);
		console.log(regPio);
	};

	const handleTechSkills = (tecSk: boolean) => {
		setTechSkills(tecSk);
		console.log(tecSk);
	};

	const handleTpApproved = (tpApp: boolean) => {
		setTpApproved(tpApp);
		console.log(tpApp);
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
				userSelect: "none",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					marginBottom: 1,
					justifyContent: "space-between",
					cursor: "pointer",
				}}
				onClick={handleClick}
			>
				<Box
					sx={{
						display: "flex",
						gap: 1,
						alignItems: "center",
					}}
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

				<IconButton aria-label="delete" size="small">
					<EditIcon fontSize="small" />
				</IconButton>
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

					<FormControlLabel
						control={
							<Switch
								checked={regularPioneer}
								onChange={(_, checked) => handleRegularPioneer(checked)}
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
						label="P. Regular"
					/>
				</Box>

				<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
					<FormControlLabel
						control={
							<Switch
								checked={techSkills}
								onChange={(_, checked) => handleTechSkills(checked)}
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
						label="Tech Skills"
					/>

					<FormControlLabel
						control={
							<Switch
								checked={tpApproved}
								onChange={(_, checked) => handleTpApproved(checked)}
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
						label="TP Aprov."
					/>
				</Box>
			</Box>
		</SCard>
	);
}
