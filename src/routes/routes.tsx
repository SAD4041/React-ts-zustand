import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import Temp from "@/pages/Temp";
import PrivateLayout from "@/layouts/PrivateLayout/PrivateLayout";
import DashBoard from "@/components/Profile/DashBoard";
import FollowBar from "@/components/Profile/FollowBar";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/LogIn";
// import { LogIn } from "lucide-react";

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
        element: <Login />,
      },
      {
        path: "/temp",
        element: <Temp />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      // {
      // 	path: "/EditProfile",
      // 	element: <EditProfile />,
      // },
      {
        path: "/DashBoard", //  /:username
        element: <DashBoard />,
      },
    ],
  },
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
