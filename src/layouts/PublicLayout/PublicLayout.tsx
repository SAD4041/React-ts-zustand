import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div style={{ fontFamily: "Peyda" }}>
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
    </div>
  );
};

export default PublicLayout;
