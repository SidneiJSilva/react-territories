import {
	CheckCircle as CheckCircleIcon,
	WarningAmber as WarningAmberIcon,
	Nightlight as NightlightIcon,
	Person as PersonIcon,
} from "@mui/icons-material";

export function StatusIcon({ status }: { status: string }) {
	switch (status) {
		case "available":
			return <CheckCircleIcon fontSize="large" />;
		case "assigned":
			return <PersonIcon fontSize="large" />;
		case "delayed":
		case "delayed_soon":
			return <WarningAmberIcon fontSize="large" />;
		case "resting":
			return <NightlightIcon fontSize="large" />;
		default:
			return null;
	}
}
