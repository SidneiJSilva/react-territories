import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HotelIcon from "@mui/icons-material/Hotel";

import { statusColors } from "@/constants/colors";

export const statusIcons: Record<
	string,
	{ icon: React.ReactNode; color: string }
> = {
	assigned: {
		icon: <AssignmentTurnedInIcon />,
		color: statusColors.assigned,
	},
	available: {
		icon: <CheckCircleIcon />,
		color: statusColors.available,
	},
	delayed: {
		icon: <ErrorIcon />,
		color: statusColors.delayed,
	},
	delayed_soon: {
		icon: <AccessTimeIcon />,
		color: statusColors.delayed_soon,
	},
	resting: {
		icon: <HotelIcon />,
		color: statusColors.resting,
	},
};
