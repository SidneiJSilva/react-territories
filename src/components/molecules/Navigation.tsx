import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useState } from "react";
import { navigationData } from "@/constants/navigation";

export default function ColorToggleButton() {
	const [territory, setTerritory] = useState(navigationData[0].value);

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newValue: string
	) => {
		setTerritory(newValue);
	};

	return (
		<ToggleButtonGroup
			color="primary"
			value={territory}
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
