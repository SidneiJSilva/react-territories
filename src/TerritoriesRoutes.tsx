import { Routes, Route } from "react-router-dom";
import App from "@/App";
import Territories from "@/pages/territories/Territories";

const TerritoriesRoutes = () => {
	return (
		<App>
			<Routes>
				<Route path="/" element={<Territories />} />
			</Routes>
		</App>
	);
};

export default TerritoriesRoutes;
