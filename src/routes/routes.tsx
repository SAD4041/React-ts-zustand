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
import BrandProfile from "@/pages/BrandProfile";
import BrandProfileEditPage from "@/pages/BrandProfileEditPage";
import WishlistPage from "@/pages/WishList";
import ProtectedRoute from "@/components/protectedRoute";

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
                path: "/dash/wishList",
                element: (
                    <ProtectedRoute>
                        <WishlistPage />
                    </ProtectedRoute>
                ),
            },
            {
                // نمایش پروفایل هر برندی (عمومی)
                path: "/brands/:brandId",
                element: <BrandProfile />,
            },
            {
                // نمایش پروفایل خودم
                path: "/my-profile",
                element: (
                    <ProtectedRoute requireBrand={true}>
                        <BrandProfile />
                    </ProtectedRoute>
                ),
            },
            {
                // ویرایش پروفایل (فقط برای brand ها)
                path: "/brandProfileEdit",
                element: (
                    <ProtectedRoute requireBrand={true}>
                        <BrandProfileEditPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },

    {
        path: "/login",
        element: <LoginLayout />,
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