import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
// import Temp from "@/pages/Temp";
import SignUp from "@/pages/SignUp";
import LogIn from "@/pages/LogIn";
import BuildTeam from "@/pages/BuildTeam";
import Dashboard from "@/pages/Dashboard";
import BootcampDetails from "@/pages/BootCamp";
import AcceptTeamInvite from "@/pages/AcceptTeamInvite";
import AdminTeamsApproval from "@/pages/Admin";
import InviteMember from "@/pages/inviteMember";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      // {
      //   path: "temp",
      //   element: <Temp />,
      // },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "buildteam",
        element: <BuildTeam />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "camp",
        element: <BootcampDetails />,
      },
      {
        path: "accept-invite",
        element: <AcceptTeamInvite />,
      },
            {
        path: "admin",
        element: <AdminTeamsApproval />,
      },
      {
        path: "invitemember",
        element: <InviteMember />,
      }
    ],
  },
]);