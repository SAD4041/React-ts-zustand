import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
// import { stats } from '@/data/about/stats';
// import { values } from '@/data/about/values';
// import { team } from '@/data/about/team';

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);

export default function App() {
//   const statsData = stats;     // یا مستقیم از stats استفاده کن
//   const valuesData = values;
//   const teamData = team;
//   // ...
}
