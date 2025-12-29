import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import AuthLayout from "@/layouts/PublicLayout/AuthLayout";
import Home from "@/pages/Home";
import Error404 from "@/pages/Error404";
import Error500 from "@/pages/Error500";
import ProductListing from "@/components/ProductListing/productListing";
import LoginForm from "@/pages/Login";
import Validation from "@/pages/Validation";
import SidebarLayout from "@/layouts/PublicLayout/SidebarLayout";
import BrandProfile from "@/pages/BrandProfile";
import BrandProfileEditPage from "@/pages/BrandProfileEditPage";
import WishlistPage from "@/pages/WishList";
import ProtectedRoute from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        errorElement: <Error404 />,
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
                path: "/brands/:brandId",
                element: <BrandProfile />,
            },

            // {
            //     path: "/brandProfileEdit",
            //     element: (
            //         <ProtectedRoute requireBrand={true}>
            //             <BrandProfileEditPage />
            //         </ProtectedRoute>
            //     ),
            // },
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
        ],
    },
    {
        path: "/login",
        element: <AuthLayout />,
        errorElement: <Error404 />,
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
]);