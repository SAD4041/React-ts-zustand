import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
<<<<<<< HEAD
import Landing from "@/pages/Landing";
import Temp from "@/pages/Temp";
import 	FAQ from "@/pages/FAQ";
=======
import LoginLayout from "@/layouts/PublicLayout/LoginLayout";
import Home from "@/pages/Home";
import Error404 from "@/pages/Error404";
import Error500 from "@/pages/Error500";
import ProductListing from "@/components/ProductListing/productListing";
import LoginForm from "@/pages/Login";
import Validation from "@/pages/Validation";
import SidebarLayout from "@/layouts/PublicLayout/SidebarLayout";
import BrandProfileEditPage from "@/pages/BrandProfileEditPage";
// import SidebarLayout from "@/layouts/PublicLayout/SidebarLayout";
import WishlistPage from "@/pages/WishList";
>>>>>>> 0f6f3f9387680b400d5ad0a40c27c9eeb416f0ca

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
				path: "/brandProfileEdit",
				element: <BrandProfileEditPage />,
			},
<<<<<<< HEAD
			{
				path: "/temp",
				element: <Temp />,
			},
			{
				path: "/FAQ",
				element: <FAQ />,
			},
			
			// {
			// 	path: "/AboutUs",
			// 	element: <AboutUs />,
			// },
			// {
		],
	},
	// {
	// 	element: <PrivateLayout />,
	// 	children: [
	// 		{
	// 			path: "/EditProfile",
	// 			element: <EditProfile />,
	// 		},
	// 		{
	// 			path: "/DashBoard",
	// 			element: <DashBoard />,
	// 		},
	// 	],
	// },
	// {
	// 	element: <AnotherLayout />,
	// 	children: [
	// 		{
	// 			path: "/login",
	// 			element: <Login />,
	// 		},
	// 		{
	// 			path: "/temp",
	// 			element: <Temp />,
	// 		},
	// 	],
	// },
=======
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
                element: <WishlistPage />,
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
>>>>>>> 0f6f3f9387680b400d5ad0a40c27c9eeb416f0ca
]);
