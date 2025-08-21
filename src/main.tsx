import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TerritoriesRoutes from "@/TerritoriesRoutes";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<TerritoriesRoutes />
	</BrowserRouter>
);
