import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { GlobalProviders } from "@/providers/GlobalProviders";
import React from "react";
import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  const isMobile = useMobile();
  return (
    <div dir="rtl">
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
      <GlobalProviders>
        {!isMobile && <Navbar isUserLoggedin={true} />}
        <Outlet />
        {!isMobile && <Footer />}
      </GlobalProviders>
    </div>
  );
}
