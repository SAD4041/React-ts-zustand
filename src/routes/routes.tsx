import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import LoginLayout from "@/layouts/PublicLayout/LoginLayout";
import Home from "@/pages/Home";
import Error404 from "@/pages/Error404";
import Error500 from "@/pages/Error500";
import ProductListing from "@/components/ProductListing/productListing";
import LoginForm from "@/pages/Login";
import Validation from "@/pages/Validation";
import BrandProfileEditPage from "@/pages/BrandProfileEditPage";
import WishlistPage from "@/pages/WishList";
import Temp from "@/routes/Temp";
import FAQ from "@/pages/FAQ";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/brandProfileEdit",
        element: <BrandProfileEditPage />,
      },
      {
        path: "/temp",
        element: <Temp />,
      },
      {
        path: "/FAQ",
        element: <FAQ />,
      },
      {
        path: "/error500",
        element: <Error500 />,
      },
      {
        path: "/products-list",
        element: <ProductListing />,
      },
      {
        path: "/dash/wishList",
        element: <WishlistPage />,
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
