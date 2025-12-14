import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Home from "@/pages/Home";
import Errors404 from "@/pages/Error404";
import Errors500 from "@/pages/Error500";
import ProductListing from "@/components/ProductListing/productListing";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		errorElement: (
			<Errors404 />
		),
		children: [
			// {
			// 	path: "/temp",
			// 	element: <Temp />,
			// },
			{
				index: true,
				element: <Home />
			},
			{
				path: "/error500",
				element: <Errors500 />
			},
			{
				path: "/products-list",
				element: <ProductListing />
			},
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
