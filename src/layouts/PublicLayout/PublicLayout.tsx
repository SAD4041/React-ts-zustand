import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header";
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
			<Header/>
			<Outlet />
			<Footer/>
		</>
	);
};

export default PublicLayout;
