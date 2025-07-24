import Territories from "@/pages/Territories";
import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "@/App";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<App>
				<Outlet />
			</App>
		),
		children: [
			{
				index: true,
				element: <Territories />,
			},
		],
	},
]);

export default router;
