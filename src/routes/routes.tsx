import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import UserDashInformation from "@/pages/userDashInfo";
import Error404 from "@/pages/Error404";
import Error500 from "@/pages/Error500";
import ProductList from "@/pages/ProductListing";


export const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		errorElement: (
			<Error404 />
		),
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: "/UserDashboard/Information",
				element: <UserDashInformation />,
			},
			{
				path: "/error500",
				element: <Error500 />
			},
			{
				path: "/productList",
				element: <ProductList />
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
