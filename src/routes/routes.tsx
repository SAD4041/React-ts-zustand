import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import Temp from "@/pages/Temp";
import FollowerFollowing from "@/pages/FollowerFollowing";
import PrivateLayout from "@/layouts/PrivateLayout/PrivateLayout";
import DashBoard from "@/components/Profile/DashBoard";
import FollowBar from "@/components/Profile/FollowBar";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/LogIn";
import Test from "@/pages/test";
import Edit from "@/pages/EditProfile";

// import { LogIn } from "lucide-react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
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
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/editprofile",
        element: <Edit />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/dashboard/:id",  // Dynamic route for user profile
        element: <DashBoard />,
      },
      {
        path: "/follow",  // Updated route for Follower/Following page
        element: <FollowerFollowing />,
      },
    ],
  },
]);
