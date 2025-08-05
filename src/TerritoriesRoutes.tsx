import { Routes, Route } from "react-router-dom";
import App from "@/App";
import Territories from "@/pages/territories/Territories";

const TerritoriesRoutes = () => {
	return (
		<App>
			<Routes>
				{/* O container irá mapear para /territories/*, então a rota raiz
            deste MFE (path="/") corresponde à página principal de territórios. */}
				<Route path="/" element={<Territories />} />

				{/* Se você tiver outras rotas, como detalhes de um território,
            elas seriam adicionadas aqui. Exemplo:
            <Route path="/details/:id" element={<TerritoryDetails />} />
        */}
			</Routes>
		</App>
	);
};

export default TerritoriesRoutes;
