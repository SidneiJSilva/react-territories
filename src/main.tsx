import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import { store, StoreContext } from "@/stores";
import router from "@/router";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
	// <StoreContext.Provider value={store}>
	// </StoreContext.Provider>
);
