import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Importe BrowserRouter
import TerritoriesRoutes from "@/TerritoriesRoutes"; // Importe o novo componente
import "./index.css";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<TerritoriesRoutes />
	</BrowserRouter>
);
