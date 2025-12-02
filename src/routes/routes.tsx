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
import PostCreation from "@/pages/PostCreation";
import PostPage from "@/pages/PostPage";
import EditPost from "@/pages/EditPost";

// import { LogIn } from "lucide-react";
import Challenge from "@/pages/ChallengeInfo";
import ChallengeEdit from "@/pages/ChallengeEdit";
import ChallengeCreate from "@/pages/ChallengeCreate";
import ProgressCalendar from "@/components/ProgressCalendar";

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
        path: "/x",
        element: <ProgressCalendar />,
      },
      {
        path: "/editprofile",
        element: <Edit />,
      },
      {
        path: "/challenge/:id",
        element: <Challenge />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "/dashboard/:userId", // Dynamic route for user profile
        element: <DashBoard />,
      },
      {
        path: "/follow/:userId", // Route to the FollowBar or FollowerFollowing page
        element: <FollowerFollowing />, // Follower/Following page
      },
      {
        path: "/create-post",
        element: <PostCreation />,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
      },
      {
        path: "/editChallenge/:challengeId",
        element: <ChallengeEdit />,
      },
      {
        path: "/createChallenge",
        element: <ChallengeCreate />,
      },
      {
        path: "/editpost/:id",
        element: <EditPost />,
      },
    ],
  },
]);
