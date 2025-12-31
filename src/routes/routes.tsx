import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import AuthLayout from "@/layouts/PublicLayout/AuthLayout";
import Home from "@/pages/Home";
// import Temp from "@/pages/Temp";
import Error404 from "@/pages/Error404";
import Error500 from "@/pages/Error500";
import ProductListing from "@/components/ProductListing/productListing";
import LoginForm from "@/pages/Login";
import Validation from "@/pages/Validation";
import BrandProfileEditPage from "@/pages/BrandProfileEditPage";
import WishlistPage from "@/pages/WishList";
import ProductManagementPage from "@/pages/BrandDash/ProductManagementPage";
import OrderHistoryPage from "@/pages/OrderHistoryPage";
import UserDashInformation from "@/pages/userDashInfo";
import FAQ from "@/pages/FAQ";
import SidebarLayout from "@/layouts/PublicLayout/SidebarLayout";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/components/ContactUs/ContactUs";
import Payment from "@/pages/PaymentPage";
import ShoppingCart from "@/pages/shoppingCart";
import ProductPages from "@/pages/ProductPage";
import SettingsPage from "@/pages/SettingsPage";
import OrderManagementPage from "@/pages/BrandDash/OrderManagementPage";
import BrandHomePage from "@/pages/BrandDash/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        errorElement: (
            <Error404 />
        ),
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/error500",
                element: <Error500 />
            },
            {
                path: "/productList",
                element: <ProductListing />
            },
            {
                path: "/UserDashboard/Information",
                element: <UserDashInformation />,
            },
            {
                path: "/FAQ",
                element: <FAQ />,
            },
            {
                path: "/aboutus",
                element: <AboutUs />,
            },
            {
                path: "/ContactUs",
                element: <ContactUs />,
            },
            {
                path: "/brandProfileEdit",
                element: <BrandProfileEditPage />,
            },

            {
                path: "/Payment",
                element: <Payment />
            },
            {
                path: "/Shopping-Cart",
                element: <ShoppingCart />
            },
            {
                path: "/ProductPage",
                element: <ProductPages />
            },

        ],
    },
    {
        path: "/dash",
        element: <SidebarLayout />,
        children: [
            // {
            //     index: true,
            //     element: <OrderHistoryPage />,
            // },
            {
                path: "/dash/product-management",
                element: <ProductManagementPage />,
            },
            {
                path: "/dash/wishList",
                element: <WishlistPage />,
            },
            {
                path: "/dash/profile-edit",
                element: <BrandProfileEditPage />,
            },
            {
                path: "/dash/orders",
                element: <OrderHistoryPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
            {
                path: "order-management",
                element: <OrderManagementPage />,
            },
            {
                path: "brand-home",
                element: <BrandHomePage />,
            },

        ],
    },

    {
        path: "/login",
        element: <AuthLayout />,
        errorElement: (
            <Error404 />
        ),
        children: [
            {
                index: true,
                element: <LoginForm />,
            },
            {
                path: "/login/verify",
                element: <Validation />,
            },
        ],
    },
    // {
    //     path: "/dash",
    //     element: <SidebarLayout />,
    //     errorElement: <Error404 />,
    //     children: [
    //         // {
    //         //     index: true,
    //         //     element: <DashboardHome />,
    //         // },
    //         {
    //             path: "/dash/wishList",
    //             element: <WishlistPage />,
    //         },
    //         // {
    //         //     path: "settings",
    //         //     element: <Settings />,
    //         // },
    //     ],
    // }
]);
