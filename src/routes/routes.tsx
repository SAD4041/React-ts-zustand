import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import PetSitterLanding from "@/pages/PetSitterLanding";
import Temp from "@/pages/Temp";
import Test from "@/pages/Test";
import Login from "@/pages/Login";
import AboutUs from "@/pages/AboutUs";
import ForgetPassword from "@/pages/ForgetPassword";
import ChangePassword from "@/pages/ChangePassword";
import Terms from "@/pages/Terms";
import Signup from "@/pages/Signup";
import ExplorePetSitter from "@/pages/ExplorePetSitter"
import AuthLayout from "@/layouts/PublicLayout/AuthLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import RegisterPetMobile from "@/pages/RegisterPetMobile";
import MobileLayout from "@/layouts/MobileLayout/MobileLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import Dashboard from "@/pages/PetDashboard";
import PetDashboard from "@/pages/PetDashboard";

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
        path: "/",
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
			{
				path: "/Petsitters",
				element: <ExplorePetSitter />,
			},

			{
				path: "/admin",
				element: <AdminDashboard />,
			},
				path: "/Dashboard/pets",
				element: <PetDashboard/>
			}
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
			{
				path: "/forget-password",
				element: <ForgetPassword />,
			},
			{
				path: "/reset-password",
				element: <ChangePassword />,
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

  
  {
    element: <MobileLayout />,
    children: [
      {
        path: "/RegisterPet",
        element: <RegisterPetMobile />,
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
