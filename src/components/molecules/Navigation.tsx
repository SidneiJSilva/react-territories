import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useState } from "react";
import { navigationData } from "@/constants/navigation";
import { navigationStore } from "@/stores/navigationStore";

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

	return (
		<ToggleButtonGroup
			color="primary"
			value={page}
			size="small"
			exclusive
			onChange={handleChange}
		>
			{navigationData.map((item) => (
				<ToggleButton value={item.value}>{item.label}</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
}
