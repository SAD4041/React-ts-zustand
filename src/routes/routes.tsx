import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import PetSitterLanding from "@/pages/PetSitterLanding";
import Temp from "@/pages/Temp";
import Test from "@/pages/Test";
import Login from "@/pages/Login";
import AboutUs from "@/pages/AboutUs";
import Terms from "@/pages/Terms";
import Signup from "@/pages/Signup";
import ExplorePetSitter from "@/pages/ExplorePetSitter"
import AuthLayout from "@/layouts/PublicLayout/AuthLayout";
import AdminDashboard from "@/pages/AdminDashboard";
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
				path:"/",
				element: <Landing />,
			},
			{
				path: "/temp",
				element: <Temp />,
			},
			{
				path: "/PetSitterLanding",
				element: <PetSitterLanding />,
			},
			{
				path: "/test",
				element: <Test />,
			},
			{
				path: "/Terms",
				element: <Terms />,
			},

			{
				path: "/AboutUs",
				element: <AboutUs />,
			},
			{
				path: "/ExplorePetSitter",
				element: <ExplorePetSitter />,
			},

			{
				path: "/admin",
				element: <AdminDashboard />,
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
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
