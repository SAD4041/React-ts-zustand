import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import Temp from "@/pages/Temp";
import AboutUs from "@/pages/AboutUs";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		// errorElement: (
		// 	<Error404 />
		// ),
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: "/temp",
				element: <Temp />,
			},
			{
				path: "/aboutus",
				element: <AboutUs />,
			},
			// {
			// 	path: "/AboutUs",
			// 	element: <AboutUs />,
			// },
			// {
		],
	},
	// {
	// 	element: <PrivateLayout />,
	// 	children: [
	// 		{
	// 			path: "/EditProfile",
	// 			element: <EditProfile />,
	// 		},
	// 		{
	// 			path: "/DashBoard",
	// 			element: <DashBoard />,
	// 		},
	// 	],
	// },
	// {
	// 	element: <AnotherLayout />,
	// 	children: [
	// 		{
	// 			path: "/login",
	// 			element: <Login />,
	// 		},
	// 		{
	// 			path: "/temp",
	// 			element: <Temp />,
	// 		},
	// 	],
	// },
]);
