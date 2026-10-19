import { styled } from "@mui/material/styles";
import Switch, { type SwitchProps } from "@mui/material/Switch";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

import { cardColors } from "@/constants/colors";

type Gender = "male" | "female";

type GenderSwitchProps = Omit<SwitchProps, "checked" | "onChange"> & {
	value: Gender;
	onChange: (gender: Gender) => void;
};

const StyledSwitch = styled(Switch)(() => ({
	width: 72,
	height: 40,
	padding: 8,

	"& .MuiSwitch-switchBase": {
		padding: 9,
		transitionDuration: "200ms",

		"&.Mui-checked": {
			transform: "translateX(32px)",
			color: "#fff",

			"& + .MuiSwitch-track": {
				backgroundColor: cardColors.male.primary,
				opacity: 1,
				border: 0,
			},
		},

		"&:not(.Mui-checked) + .MuiSwitch-track": {
			backgroundColor: cardColors.female.primary,
			opacity: 1,
		},
	},

	"& .MuiSwitch-thumb": {
		backgroundColor: "#fff",
		width: 22,
		height: 22,
		boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",

		"&::before": {
			content: '""',
			position: "absolute",
			width: "100%",
			height: "100%",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
		},
	},

	"& .MuiSwitch-track": {
		borderRadius: 20,
		backgroundColor: cardColors.female.primary,
		opacity: 1,
	},
}));

export default function GenderSwitch({
	value,
	onChange,
	...props
}: GenderSwitchProps) {
	return (
		<StyledSwitch
			checked={value === "male"}
			onChange={(_, checked) => onChange(checked ? "male" : "female")}
			icon={
				<FemaleIcon sx={{ color: cardColors.female.primary, fontSize: 18 }} />
			}
			checkedIcon={
				<MaleIcon sx={{ color: cardColors.male.primary, fontSize: 18 }} />
			}
			slotProps={{
				input: {
					"aria-label": "Género",
				},
			}}
			{...props}
		/>
	);
}
