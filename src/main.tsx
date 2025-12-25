import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { aboutStats } from '@/data/about-stats';
import { aboutValues } from '@/data/about-values';
import { teamMembers } from '@/data/team-members';

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);

export default function App() {
  const stats = aboutStats;
  const values = aboutValues;
  const team = teamMembers;

}
