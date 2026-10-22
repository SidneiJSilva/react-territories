import SCard from "@/components/atoms/cards/SCard";
import {
	Box,
	IconButton,
	FormControlLabel,
	Switch,
	Typography,
	CircularProgress,
} from "@mui/material";
import {
	Edit as EditIcon,
	Cancel as CancelIcon,
	Save as SaveIcon,
} from "@mui/icons-material";

import { cardColors } from "@/constants/colors";
import type { PeopleInterface } from "@/interfaces";
import { useEffect, useState } from "react";
import { useDialogStore } from "@/stores/dialogStore";
import { statusBgColors, statusColors } from "@/constants/colors";
import { usePeople } from "@/hooks";

export default function PeopleListItem({
	person,
}: {
	person: PeopleInterface;
}) {
	const { openPersonDialog } = useDialogStore();
	const { updatePerson } = usePeople();
	const genderColors =
		person.gender === "male" ? cardColors.male : cardColors.female;
	const [active, setActive] = useState(person.active);
	const [regularPioneer, setRegularPioneer] = useState(person.regularpionner);
	const [techSkills, setTechSkills] = useState(person.techskills);
	const [tpApproved, setTpApproved] = useState(person.tpapproved);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setActive(person.active);
		setRegularPioneer(person.regularpionner);
		setTechSkills(person.techskills);
		setTpApproved(person.tpapproved);
	}, [
		person.active,
		person.regularpionner,
		person.techskills,
		person.tpapproved,
	]);

	const hasChanges =
		active !== person.active ||
		regularPioneer !== person.regularpionner ||
		techSkills !== person.techskills ||
		tpApproved !== person.tpapproved;

	const handleClick = () => {
		openPersonDialog(person);
	};

	const initials = () => {
		return `${person.firstname[0]}${person.lastname[0]}`;
	};

	const handleActive = (act: boolean) => {
		setActive(act);
	};

	const handleRegularPioneer = (regPio: boolean) => {
		setRegularPioneer(regPio);
	};

	const handleTechSkills = (tecSk: boolean) => {
		setTechSkills(tecSk);
	};

	const handleTpApproved = (tpApp: boolean) => {
		setTpApproved(tpApp);
	};

	const handleCancel = () => {
		setActive(person.active);
		setRegularPioneer(person.regularpionner);
		setTechSkills(person.techskills);
		setTpApproved(person.tpapproved);
	};

	const handleSave = async () => {
		setIsLoading(true);
		const personToUpdate = getPersonToUpdate();

		try {
			await updatePerson(person.peopleid, personToUpdate);
		} finally {
			setIsLoading(false);
		}
	};

	const getPersonToUpdate = () => {
		const personToUpdate: Partial<PeopleInterface> = {};

		if (active !== person.active) {
			personToUpdate.active = active;
		}
		if (regularPioneer !== person.regularpionner) {
			personToUpdate.regularpionner = regularPioneer;
		}
		if (techSkills !== person.techskills) {
			personToUpdate.techskills = techSkills;
		}
		if (tpApproved !== person.tpapproved) {
			personToUpdate.tpapproved = tpApproved;
		}

		return personToUpdate as PeopleInterface;
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

				{!hasChanges ? (
					<Box
						sx={{
							backgroundColor: statusBgColors["available"],
							borderRadius: ".5rem",
						}}
					>
						<IconButton size="small" sx={{ color: statusColors["available"] }}>
							<EditIcon fontSize="small" />
						</IconButton>
					</Box>
				) : (
					<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
						<Box
							sx={{
								backgroundColor: statusBgColors["delayed"],
								borderRadius: ".5rem",
							}}
						>
							<IconButton
								size="small"
								sx={{ color: statusColors["delayed"] }}
								onClick={(evt) => {
									evt.stopPropagation();
									handleCancel();
								}}
							>
								<CancelIcon fontSize="small" />
							</IconButton>
						</Box>

						<Box
							sx={{
								backgroundColor: statusBgColors["available"],
								borderRadius: ".5rem",
							}}
						>
							<IconButton
								size="small"
								sx={{ color: statusColors["available"] }}
								onClick={(evt) => {
									evt.stopPropagation();
									handleSave();
								}}
							>
								<SaveIcon fontSize="small" />
							</IconButton>
						</Box>
					</Box>
				)}
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
