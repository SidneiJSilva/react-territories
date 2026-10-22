import Territories from "@/pages/territories/Territories";
import People from "@/pages/people/People";
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
			{
				path: "/map",
				element: <Territories />,
			},
			{
				path: "/people",
				element: <People />,
			},
		],
	},
]);

export default router;
