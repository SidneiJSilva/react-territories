import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useState } from "react";
import { navigationData } from "@/constants/navigation";
import { navigationStore } from "@/stores/navigationStore";
import { isMobileScreen } from "@/utils/screenSize";

export default function ColorToggleButton() {
	const [page, setPage] = useState(navigationData[0].value);
	const { setActualPage } = navigationStore();

	const handleChange = (
		_event: React.MouseEvent<HTMLElement>,
		newValue: string
	) => {
		setPage(newValue);
		setActualPage(newValue);
	};

	const buttonsToRender = isMobileScreen()
		? navigationData.filter((item) => item.value !== "group")
		: navigationData;

	return (
		<ToggleButtonGroup
			color="primary"
			value={page}
			size="small"
			exclusive
			onChange={handleChange}
		>
			{buttonsToRender.map((item) => (
				<ToggleButton value={item.value}>{item.label}</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
