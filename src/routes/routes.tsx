import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import LoginLayout from "@/layouts/PublicLayout/LoginLayout";
import Home from "@/pages/Home";
import Error404 from "@/pages/Error404";
import Error500 from "@/pages/Error500";
import ProductListing from "@/components/ProductListing/productListing";
import LoginForm from "@/pages/Login";
import Validation from "@/pages/Validation";
import SidebarLayout from "@/layouts/PublicLayout/SidebarLayout";
import Payment from "@/pages/PaymentPage";
import ShoppingCart from "@/pages/shoppingCart";
import ProductPages from "@/pages/ProductPage";

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
                path: "/products-list",
                element: <ProductListing />
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
        path: "/login",
        element: <LoginLayout />,
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
    {
        path: "/dash",
        element: <SidebarLayout />,
        errorElement: <Error404 />,
        children: [
            // {
            //     index: true,
            //     element: <DashboardHome />,
            // },
            // {
            //     path: "profile",
            //     element: <Profile />,
            // },
            // {
            //     path: "settings",
            //     element: <Settings />,
            // },
        ],
    }
]);
