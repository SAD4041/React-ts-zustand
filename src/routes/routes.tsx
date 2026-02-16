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
import FilterPage from "@/pages/FilterPage";


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
                element: <ProductListing />,
            },
            {
                path: "/:type/:value",
                element: <FilterPage />,
            },
            {
                path: "/faq",
                element: <FAQ />,
            },
            {
                path: "/about-us",
                element: <AboutUs />,
            },
            {
                path: "contact-us",
                element: <ContactUs />,
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
                path: "/product-page/:id",
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
                element: <BrandHomePage />,
                // element: (
                //     <ProtectedRoute>
                //     <BrandHomePage />
                //     </ProtectedRoute>
                // ),
            },
            {
                path: "/dash/brand/product-management",
                element: <ProductManagementPage />,
                // element: (
                //     <ProtectedRoute allowedRoles={['M']}>
                //         <ProductManagementPage />
                //     </ProtectedRoute>
                // ),
            },
            {
                path: "/dash/brand/order-management",
                element: <OrderManagementPage />,
                // element: (
                //     <ProtectedRoute allowedRoles={['M']}>
                //     <OrderManagementPage />
                //     </ProtectedRoute>
                // ),
            },
            {
                path: "/dash/brand/settings",
                element: <SettingsPage />,
                // element: (
                //     <ProtectedRoute allowedRoles={['M']}>
                //         <SettingsPage />
                //     </ProtectedRoute>
                // ),
            },
            {
                path: "/dash/brand/profile-edit",
                element: <BrandProfileEditPage />
            },
            {
                path: "/dash/brand/profile/:brandId",
                element: <ProductPages />,
                // element: (
                //     <ProtectedRoute>
                //         <ProductPages />
                //     </ProtectedRoute>
                // ),
            },
            {
                path: "/dash/home",
                element: <OrderHistoryPage />,
                // element: (
                //     <ProtectedRoute allowedRoles={['C']}>
                //         <OrderHistoryPage />
                //     </ProtectedRoute>
                // ),
            },
            {
                path: "/dash/wish-list",
                element: <WishlistPage />,
                // element: (
                //     <ProtectedRoute allowedRoles={['C']}>
                //         <WishlistPage />
                //     </ProtectedRoute>
                // ),
            },
            {
                path: "/dash/profile",
                element: <UserDashInformation />,
                // element: (
                //     <ProtectedRoute allowedRoles={['C']}>
                //         <UserDashInformation />
                //     </ProtectedRoute>
                // ),
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
