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
import BrandProfile from "@/pages/BrandProfile";
import ProtectedRoute from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: (
                    <Home />
                ),
            },
            {
                path: "/error500",
                element: <Error500 />
            },
            {
                path: "/product-list",
                element: (
                    <ProtectedRoute>
                        <ProductListing />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/faq",
                element: (
                    <ProtectedRoute>
                        <FAQ />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/about-us",
                element: (
                    <ProtectedRoute>
                        <AboutUs />
                    </ProtectedRoute>
                ),
            },
            {
                path: "contact-us",
                element: (
                    <ProtectedRoute>
                        <ContactUs />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/payment",
                element: (
                    <ProtectedRoute>
                        <Payment />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/shopping-cart",
                element: (
                    <ProtectedRoute>
                        <ShoppingCart />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/product-page",
                element: (
                    <ProtectedRoute>
                        <ProductPages />
                    </ProtectedRoute>
                ),
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
            //     element: <OrderHistoryPage />,
            // },
            {
                path: "/dash/brand/home",
                element: (
                    <ProtectedRoute>
                        <BrandHomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/brand/product-management",
                element: (
                    <ProtectedRoute allowedRoles={['brand']}>
                        <ProductManagementPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/brand/order-management",
                element: (
                    <ProtectedRoute allowedRoles={['user']}>
                        <OrderManagementPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/brand/settings",
                element: (
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/brand/profile-edit",
                element: (
                    <ProtectedRoute allowedRoles={['brand']}>
                        <BrandProfileEditPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/brand/profile/:brandId",
                element: (
                    <ProtectedRoute>
                        <ProductPages />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/home",
                element: (
                    <ProtectedRoute allowedRoles={['user']}>
                        <OrderHistoryPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/wish-list",
                element: (
                    <ProtectedRoute allowedRoles={['user']}>
                        <WishlistPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/profile",
                element: (
                    <ProtectedRoute allowedRoles={['user']}>
                        <UserDashInformation />
                    </ProtectedRoute>
                ),
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
