import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";

const PublicLayout = () => {
	return (
		<>
			<Toaster
				position="bottom-right"
				richColors={true}
				duration={5000}
				// toastOptions={{
				// 	style: {
				// 		color: "red",
				// 	},
				// }}
			/>
			<Outlet />
			<Footer/>
		</>
	);
};

export default PublicLayout;
