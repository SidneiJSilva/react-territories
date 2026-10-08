import { Routes, Route } from "react-router-dom";

import App from "@/App";
import Territories from "@/pages/territories/Territories";

type TerritoriesRoutesProps = {
	getToken?: () => Promise<string | null>;
};

const TerritoriesRoutes = ({ getToken }: TerritoriesRoutesProps) => {
	return (
		<App getToken={getToken}>
			<Routes>
				<Route path="/" element={<Territories />} />
			</Routes>
		</App>
	);
};

export default TerritoriesRoutes;
