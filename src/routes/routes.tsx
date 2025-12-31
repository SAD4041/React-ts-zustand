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
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/error500",
                element: <Error500 />
            },
            {
                path: "/productList",
                element: (
                    <ProtectedRoute>
                        <ProductListing />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/UserDashboard/Information",
                element: (
                    <ProtectedRoute allowedRoles={['user']}>
                        <UserDashInformation />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/FAQ",
                element: (
                    <ProtectedRoute>
                        <FAQ />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/aboutus",
                element: (
                    <ProtectedRoute>
                        <AboutUs />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/ContactUs",
                element: (
                    <ProtectedRoute>
                        <ContactUs />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/Payment",
                element: (
                    <ProtectedRoute>
                        <Payment />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/Shopping-Cart",
                element: (
                    <ProtectedRoute>
                        <ShoppingCart />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/ProductPage",
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
                path: "/dash/product-management",
                element: (
                    <ProtectedRoute allowedRoles={['brand']}>
                        <ProductManagementPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/orders",
                element: (
                    <ProtectedRoute allowedRoles={['user']}>
                        <OrderHistoryPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "settings",
                element: (
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "order-management",
                element: (
                    <ProtectedRoute allowedRoles={['user']}>
                        <OrderManagementPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "brand-home",
                element: (
                    <ProtectedRoute>
                        <BrandHomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/wishList",
                element: (
                    <ProtectedRoute allowedRoles={['user']}>
                        <WishlistPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/dash/brandProfileEdit",
                element: (
                    <ProtectedRoute allowedRoles={['brand']}>
                        <BrandProfileEditPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/brandProfile/:brandId",
                element: (
                    <ProtectedRoute>
                        <ProductPages />
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