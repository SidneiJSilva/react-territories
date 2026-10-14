import {
	Check as CheckIcon,
	WarningAmber as WarningAmberIcon,
	NightsStay as NightsStayIcon,
	Person as PersonIcon,
} from "@mui/icons-material";

export function StatusIcon({ status }: { status: string }) {
	switch (status) {
		case "available":
			return <CheckIcon sx={{ fontSize: "2.3rem" }} />;
		case "assigned":
			return <PersonIcon sx={{ fontSize: "2.3rem" }} />;
		case "delayed":
		case "delayed_soon":
			return <WarningAmberIcon sx={{ fontSize: "2.3rem" }} />;
		case "resting":
			return <NightsStayIcon sx={{ fontSize: "2.3rem" }} />;
		default:
			return null;
	}
}
